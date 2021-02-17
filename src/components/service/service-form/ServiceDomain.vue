<template>
  <input-card>
    <div slot="title">Domain*</div>
    <div slot="subtitle">
      Choose which domain you want to add the service to.
    </div>
    <v-menu offset-y slot="action">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :disabled="isServiceUpdate"
          :dark="!isServiceUpdate"
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
        <v-list-item v-for="(domain, index) in domainNamesArray" :key="index">
          <v-list-item-title @click="selectDomain(domain)">
            {{ domain }}{{ rootDomain }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </input-card>
</template>

<script>
import _ from "lodash";
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
    if (this.isServiceUpdate) {
      this.selectedDomain = this.domain;
    } else {
      this.selectedDomain = this.firstDomain;
      this.$store.commit("serviceFormModule/addDomain", this.firstDomain);
    }
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
    domains() {
      const domains = localStorage.getItem("domains");
      return JSON.parse(domains);
    },
    domain() {
      return this.$store.state.serviceFormModule.domain;
    },
    noDomains() {
      return _.isEmpty(this.domains);
    },
    domainNamesArray() {
      if (this.noDomains) {
        return [];
      } else {
        const domainNames = this.domains.map(str => {
          return str.name;
        });
        return domainNames;
      }
    },
    firstDomain() {
      return this.domainNamesArray[0];
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
