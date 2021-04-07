<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ title }}
      </div>
      <div v-if="isGhostDetails" slot="subtitle">
        {{ domainURI }}<span class="font-weight-bold">{{ ghostID }}</span>
      </div>
    </page-title>
    <div slot="page-content">
      <domain-empty v-if="noDomains && noServices && noGhosts"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices && noGhosts"></ghosts-empty>
      <router-view></router-view>
      <router-view name="secondary"></router-view>
    </div>
    <div slot="page-content-right">
      <router-view name="side-right"></router-view>
    </div>
  </page-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
export default {
  created() {
    if (this.noGhosts) {
      this.getOwnedGhosts();
    }
    if (this.isGhostDetails) {
      this.getGhostStatus();
    }
    this.lookForNewGhosts();
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
    },
    getGhostStatus() {
      this.$socket.emit("get_ghost_status", {
        token: this.token,
        username: this.username,
        domain: this.selectedGhost.domain,
        service: this.selectedGhost.service,
        instance: this.selectedGhost.instance
      });
    }
  },
  computed: {
    ...mapState("authentication", ["token", "username"]),
    ...mapGetters("services", ["noServices"]),
    ...mapGetters("domains", ["noDomains"]),
    ...mapGetters("ghosts", ["noGhosts"]),
    ...mapGetters("ghostDetails", ["domainURI", "ghostID"]),
    ...mapState("alert", [
      "addGhostSuccess",
      "acceptGhostSuccess",
      "declineGhostSuccess",
      "removeGhostSuccess",
      "giveReadAccessSuccess",
      "removeReadAccessSuccess",
      "addPrimaryGhostSuccess",
      "removePrimaryGhostSuccess"
    ]),
    title() {
      return this.$route.meta.title;
    },
    isGhostDetails() {
      return this.$route.name === "ghostDetails";
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
    giveReadAccessSuccess() {
      this.getGhostStatus();
    },
    removeReadAccessSuccess() {
      this.getGhostStatus();
    },
    addPrimaryGhostSuccess() {
      this.getGhostStatus();
    },
    removePrimaryGhostSuccess() {
      this.getGhostStatus();
    }
  },
  components: {
    PageLayout,
    PageTitle,
    DomainEmpty,
    GhostsEmpty
  }
};
</script>
