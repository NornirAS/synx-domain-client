<template>
  <form-input-card>
    <div slot="title">Domain*</div>
    <div slot="subtitle">
      Choose which domain you want to add the service to.
    </div>
    <v-menu offset-y slot="action">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-none domain-dropdown"
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <span class="font-weight-bold">{{ selectedDomain }}</span>
          {{ rootDomain }}
          <v-icon v-if="!isServiceUpdate" large>{{ mdiMenuDown }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(domain, index) in domainNames" :key="index">
          <v-list-item-title @click="selectDomain(domain)">
            {{ domain }}{{ rootDomain }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </form-input-card>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
import { rootDomain } from "../../../core/config.js";
import { mapGetters, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      mdiMenuDown,
      rootDomain,
      selectedDomain: ""
    };
  },
  created() {
    this.selectedDomain = this.domainNames[0];
    this.addDomain(this.domainNames[0]);
  },
  methods: {
    ...mapMutations("serviceFormModule", ["addDomain"]),
    selectDomain(domain) {
      this.selectedDomain = domain;
      this.addDomain(domain);
    }
  },
  computed: {
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    ...mapGetters("servicesFormModule", ["noServices"]),
    ...mapGetters("domainsModule", ["noDomains", "domainNames"])
  },
  components: {
    FormInputCard
  }
};
</script>

<style scoped>
.domain-dropdown {
  width: 50%;
}
</style>
