<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        Ghosts
      </div>
      <v-btn
        :to="{ name: 'new-ghosts' }"
        slot="action"
        class="text-capitalize"
        small
        rounded
        outlined
        color="primary"
      >
        Look for new ghosts
      </v-btn>
    </page-title>
    <div slot="page-content">
      <domain-empty v-if="noDomains && noServices"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices"></ghosts-empty>
      <!-- <InstancesTable v-if="!noDomains && !noServices" /> -->
      <v-card></v-card>
      {{ noServices }}{{ noDomains }}
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
// import InstancesTable from "../components/instance/InstancesTable";
export default {
  created() {
    this.$socket.emit("get_all_instances", this.token);
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    services() {
      return localStorage.getItem("services");
    },
    noServices() {
      return _.isEmpty(this.services);
    },
    domains() {
      return localStorage.getItem("domains");
    },
    noDomains() {
      return _.isEmpty(this.domains);
    },
    instances() {
      return this.$store.state.instancesModule.instances;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    },
    isInstances() {
      return this.instances.length !== 0 ? true : false;
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("get_all_instances", this.token);
    }
  },
  components: {
    // InstancesTable,
    PageLayout,
    PageTitle,
    DomainEmpty,
    GhostsEmpty
  }
};
</script>
