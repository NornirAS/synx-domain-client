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
      <InstancesTable v-if="isInstances" :instances="instances" />
      <ghosts-empty v-else></ghosts-empty>
    </div>
  </page-layout>
</template>

<script>
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
import InstancesTable from "../components/instance/InstancesTable";
export default {
  created() {
    this.$socket.emit("get_all_instances", this.token);
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
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
    InstancesTable,
    PageLayout,
    PageTitle,
    GhostsEmpty
  }
};
</script>
