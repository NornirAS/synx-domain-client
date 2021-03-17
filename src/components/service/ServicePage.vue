<template>
  <page-layout>
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
import { mapState, mapGetters } from "vuex";
import PageLayout from "../PageLayout";
import DeleteService from "../service/DeleteService";
export default {
  methods: {
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
    ...mapGetters("serviceFormModule", ["serviceURI", "serviceURL"]),
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
    DeleteService
  }
};
</script>
