<template>
  <input-card>
    <div slot="title">Domain*</div>
    <div slot="subtitle">
      Choose which domain you want to add the service to.
    </div>
    <v-menu offset-y slot="action">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-none domain-dropdown"
          color="secondary"
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
  </input-card>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
import { rootDomain } from "../../../core/config.js";
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
    this.$store.commit("serviceFormModule/addDomain", this.domainNames[0]);
  },
  methods: {
    selectDomain(domain) {
      this.selectedDomain = domain;
      this.$store.commit("serviceFormModule/addDomain", domain);
    }
  },
  computed: {
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    noServices() {
      return this.$store.getters["servicesModule/noServices"];
    },
    noDomains() {
      return this.$store.getters["domainsModule/noDomains"];
    },
    domainNames() {
      return this.$store.getters["domainsModule/domainNames"];
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>

<style scoped>
.domain-dropdown {
  width: 50%;
}
</style>
