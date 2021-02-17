<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">{{ title }}</div>
    </page-title>
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
    if (this.isServiceUpdate) {
      this.title = "Update Morphic Service";
    } else {
      this.title = "New Morphic Service";
    }
  },
  beforeDestroy() {
    this.$store.commit("serviceFormModule/resetServiceForm");
  },
  computed: {
    imageUrl() {
      return this.$store.state.micropageFormModule.imageUrl;
    },
    serviceDescription() {
      return this.$store.state.micropageFormModule.description;
    },
    schemaDescription() {
      return this.$store.getters[
        "micropageFormModule/makeXmlSchemaVisibleInHtml"
      ];
    },
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    registerServiceSuccess() {
      return this.$store.state.alarmModule.registerServiceSuccess;
    },
    updateServiceSuccess() {
      return this.$store.state.alarmModule.updateServiceSuccess;
    },
    deleteServiceSuccess() {
      return this.$store.state.alarmModule.deleteServiceSuccess;
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
    }
  },
  components: {
    PageLayout: () => import("../components/PageLayout"),
    PageTitle: () => import("../components/PageTitle"),
    DeleteService: () => import("../components/service/DeleteService")
  }
};
</script>
