<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">{{ title }}</div>
      <div v-if="isServiceUpdate" slot="subtitle">{{ serviceURI }}</div>
      <a
        v-if="isMicropageUpdate"
        slot="subtitle"
        :href="serviceURL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-decoration-none"
      >
        {{ serviceURI }}
      </a>
      <v-btn
        v-if="isServicesPage && !isServiceLimit && !noDomains && !noServices"
        :to="{ name: 'serviceCreate' }"
        slot="action"
        color="primary"
      >
        Add Service
      </v-btn>
    </page-title>
    <div slot="alert">
      <alert-limit v-if="isServicesPage && isServiceLimit"></alert-limit>
    </div>
    <div slot="page-content">
      <services-empty
        v-if="!noDomains && noServices && isServicesPage"
      ></services-empty>
      <domain-empty
        v-if="noDomains && noServices && isServicesPage"
      ></domain-empty>
      <router-view name="switch-tabs"></router-view>
      <router-view></router-view>
      <router-view name="delete-service"></router-view>
    </div>
    <div slot="page-content-right">
      <v-row v-for="(videoUrl, index) in tutorialVideos" :key="index">
        <v-col>
          <iframe
            width="50%"
            height="150px"
            :src="videoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </div>
  </page-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  howToCreateMorphicService,
  howToUseInlineScript,
  howToLinkTwoServices,
  howToCreateMicropage
} from "../core/tutorial-videos";
import PageTitle from "../components/globals/PageTitle";
import PageLayout from "../components/globals/PageLayout";
import ServicesEmpty from "../components/empty-page/ServicesEmpty";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import AlertLimit from "../components/globals/AlertLimit";
export default {
  created() {
    if (this.noServices && this.hasActiveDomains) {
      this.getAllServices();
    } else {
      this.addServicesFromStorage;
    }
  },
  methods: {
    ...mapActions("services", ["addServicesFromStorage"]),
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
    }
  },
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("alert", [
      "registerServiceSuccess",
      "updateServiceSuccess",
      "deleteServiceSuccess",
      "updateMicropageSuccess"
    ]),
    ...mapGetters("services", ["noServices", "isServiceLimit"]),
    ...mapGetters("domains", ["noDomains", "hasActiveDomains", "firstDomain"]),
    ...mapGetters("serviceForm", ["serviceURI", "serviceURL"]),
    title() {
      return this.$route.meta.title;
    },
    isServicesPage() {
      return this.$route.name === "services";
    },
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    isMicropageUpdate() {
      return this.$route.name === "micropageUpdate";
    },
    tutorialVideos() {
      if (this.isServicesPage) {
        return [howToCreateMorphicService];
      } else if (this.isServiceUpdate) {
        return [howToLinkTwoServices, howToUseInlineScript];
      } else if (this.isMicropageUpdate) {
        return [howToCreateMicropage];
      } else {
        return [];
      }
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
    ServicesEmpty,
    DomainEmpty,
    AlertLimit
  }
};
</script>
