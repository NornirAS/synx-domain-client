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
import { mapState, mapGetters, mapMutations } from "vuex";
import PageLayout from "../PageLayout";
import PageTitle from "../PageTitle";
import DeleteService from "../service/DeleteService";
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
    this.resetServiceForm();
  },
  methods: {
    ...mapMutations("serviceFormModule", ["resetServiceForm"]),
    getAllServices() {
      this.$socket.emit("get_all_services", {
        token: this.token,
        domain: this.firstDomain
      });
    },
    getOwnedGhosts() {
      this.$socket.emit("get_owned_ghosts", {
        token: this.token
      });
    },
    toServiceUpdate() {
      this.$router.push({ name: "serviceUpdate" });
    },
    toMicropageUpdate() {
      this.$router.push({ name: "micropageUpdate" });
    }
  },
  computed: {
    ...mapState("authModule", ["token"]),
    ...mapState("alarmModule", [
      "registerServiceSuccess",
      "updateServiceSuccess",
      "deleteServiceSuccess",
      "updateMicropageSuccess"
    ]),
    ...mapGetters("domainsModule", ["firstDomain"]),
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    isMicropageUpdate() {
      return this.$route.name === "micropageUpdate";
    }
  },
  watch: {
    registerServiceSuccess() {
      this.$router.push({ name: "services" });
      this.getAllServices();
    },
    updateServiceSuccess() {
      this.$router.push({ name: "services" });
      this.getAllServices();
    },
    deleteServiceSuccess() {
      this.$router.push({ name: "services" });
      this.getAllServices();
      this.getOwnedGhosts();
    },
    updateMicropageSuccess() {
      this.$router.push({ name: "services" });
    }
  },
  components: {
    PageLayout,
    PageTitle,
    DeleteService
  }
};
</script>

<style scoped>
.v-tabs {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
