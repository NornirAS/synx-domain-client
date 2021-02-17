<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">{{ title }}</div>
    </page-title>
    <v-tabs
      v-if="isServiceUpdate || isMicropageUpdate"
      slot="page-search"
      fixed-tabs
    >
      <v-tab @click="isMicropageUpdate ? toServiceUpdate() : false">
        Service
      </v-tab>
      <v-tab @click="isServiceUpdate ? toMicropageUpdate() : false">
        Micropage
      </v-tab>
    </v-tabs>
    <v-card slot="page-content">
      <router-view></router-view>
    </v-card>
    <div v-if="isServiceUpdate" slot="page-content-right">
      <div class="title">Other Actions</div>
      <delete-service></delete-service>
    </div>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  created() {
    this.title = this.isServiceUpdate
      ? "Update Morphic Service"
      : "New Morphic Service";
  },
  beforeDestroy() {
    this.$store.commit("serviceFormModule/resetServiceForm");
  },
  methods: {
    toServiceUpdate() {
      this.$router.push({ name: "serviceUpdate" });
    },
    toMicropageUpdate() {
      this.$router.push({ name: "micropageUpdate" });
    }
  },
  computed: {
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    isMicropageUpdate() {
      return this.$route.name === "micropageUpdate";
    },
    registerServiceSuccess() {
      return this.$store.state.alarmModule.registerServiceSuccess;
    },
    updateServiceSuccess() {
      return this.$store.state.alarmModule.updateServiceSuccess;
    },
    deleteServiceSuccess() {
      return this.$store.state.alarmModule.deleteServiceSuccess;
    },
    updateMicropageSuccess() {
      return this.$store.state.alarmModule.updateMicropageSuccess;
    }
  },
  watch: {
    registerServiceSuccess() {
      this.$router.push({ name: "services" });
    },
    updateServiceSuccess() {
      this.$router.push({ name: "services" });
    },
    deleteServiceSuccess() {
      this.$router.push({ name: "services" });
    },
    updateMicropageSuccess() {
      this.$router.push({ name: "services" });
    }
  },
  components: {
    PageLayout: () => import("../components/PageLayout"),
    PageTitle: () => import("../components/PageTitle"),
    DeleteService: () => import("../components/service/DeleteService")
  }
};
</script>

<style scoped>
.v-tabs {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
