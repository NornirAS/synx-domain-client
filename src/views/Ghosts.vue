<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ title }}
      </div>
      <div v-if="isGhostOverviewPage" slot="subtitle">
        {{ domainURI }}<span class="font-weight-bold">{{ ghostID }}</span>
      </div>
    </page-title>
    <div slot="alert">
      <alert-limit v-if="isGhostsPage && isGhostLimit"></alert-limit>
    </div>
    <div slot="page-content">
      <domain-empty v-if="noDomains && noServices && noGhosts"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices && noGhosts"></ghosts-empty>
      <router-view></router-view>
      <router-view name="ghosts-list"></router-view>
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
      <curl-connection
        v-if="isGhostOverviewPage && isExampleService"
        :curlReceive="curlReceive"
        :curlSend="curlSend"
      ></curl-connection>
    </div>
  </page-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { howToCreateGhost } from "../core/tutorial-videos";
import PageTitle from "../components/globals/PageTitle";
import PageLayout from "../components/globals/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
import AlertLimit from "../components/globals/AlertLimit";
import CurlConnection from "../components/globals/CurlConnection";
export default {
  created() {
    if (!this.noServices && this.noGhosts) {
      this.getOwnedGhosts();
      this.lookForNewGhosts();
    }
  },
  methods: {
    getOwnedGhosts() {
      this.$socket.emit("get_owned_ghosts", {
        token: this.token
      });
    },
    lookForNewGhosts() {
      this.$socket.emit("look_for_new_ghosts", {
        token: this.token,
        username: this.username
      });
    }
  },
  computed: {
    ...mapState("authentication", ["token", "username"]),
    ...mapState("ghostDetails", ["selectedGhost"]),
    ...mapGetters("services", ["noServices"]),
    ...mapGetters("domains", ["noDomains"]),
    ...mapGetters("ghosts", ["noGhosts", "isGhostLimit"]),
    ...mapGetters("ghostDetails", ["domainURI", "ghostID"]),
    ...mapState("alert", [
      "addGhostSuccess",
      "acceptGhostSuccess",
      "declineGhostSuccess",
      "addMapIdSuccess",
      "tranferOwnershipSuccess",
      "removeGhostSuccess"
    ]),
    title() {
      return this.$route.meta.title;
    },
    isGhostsPage() {
      return this.$route.name === "ghosts";
    },
    isGhostOverviewPage() {
      return this.$route.name === "ghostOverview";
    },
    tutorialVideos() {
      if (this.isGhostsPage) {
        return [howToCreateGhost];
      } else {
        return [];
      }
    },
    service() {
      return this.selectedGhost.service.toLowerCase();
    },
    serviceURL() {
      return `https://${this.domainURI}${this.service}`;
    },
    isExampleService() {
      return this.service === "example";
    },
    curlReceive() {
      return `curl -k ${this.serviceURL} -H "Synx-Cat: 4" -d "token=${this.token}&objectID=${this.selectedGhost.instance}"`;
    },
    curlSend() {
      return `curl -k ${this.serviceURL} -H "Synx-Cat: 1" -d "token=${this.token}&objectID=${this.selectedGhost.instance}&txt=Test connection"`;
    }
  },
  watch: {
    addGhostSuccess() {
      this.getOwnedGhosts();
    },
    acceptGhostSuccess() {
      this.getOwnedGhosts();
      this.lookForNewGhosts();
    },
    declineGhostSuccess() {
      this.getOwnedGhosts();
      this.lookForNewGhosts();
    },
    removeGhostSuccess() {
      this.getOwnedGhosts();
    },
    addMapIdSuccess() {
      this.getOwnedGhosts();
    },
    tranferOwnershipSuccess() {
      this.getOwnedGhosts();
    }
  },
  components: {
    PageLayout,
    PageTitle,
    DomainEmpty,
    GhostsEmpty,
    AlertLimit,
    CurlConnection
  }
};
</script>
