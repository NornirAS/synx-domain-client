<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ title }}
      </div>
      <div v-if="isGhostDetailsPage" slot="subtitle">
        {{ domainURI }}<span class="font-weight-bold">{{ ghostID }}</span>
      </div>
    </page-title>
    <div slot="alert">
      <alert-limit v-if="isGhostsPage && isGhostLimit"></alert-limit>
    </div>
    <div slot="page-content">
      <router-view></router-view>
      <router-view name="ghosts-list"></router-view>
      <router-view name="ghost-status"></router-view>
      <router-view name="remove-ghost"></router-view>
      <domain-empty v-if="noDomains && noServices && noGhosts"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices && noGhosts"></ghosts-empty>
    </div>
  </page-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PageTitle from "../components/globals/PageTitle";
import PageLayout from "../components/globals/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
import AlertLimit from "../components/globals/AlertLimit";
export default {
  created() {
    if (!this.noServices && this.noGhosts) {
      this.getOwnedGhosts();
      this.lookForNewGhosts();
    }
    if (this.isGhostDetailsPage) this.getGhostStatus();
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
    ...mapGetters("ghosts", ["noGhosts", "isGhostLimit"]),
    ...mapGetters("ghostDetails", ["domainURI", "ghostID"]),
    ...mapState("alert", [
      "addGhostSuccess",
      "acceptGhostSuccess",
      "declineGhostSuccess",
      "removeGhostSuccess",
      "giveReadAccessSuccess",
      "removeReadAccessSuccess",
      "addPrimaryGhostSuccess",
      "removePrimaryGhostSuccess",
      "addMapIdSuccess",
      "tranferOwnershipSuccess"
    ]),
    title() {
      return this.$route.meta.title;
    },
    isGhostsPage() {
      return this.$route.name === "ghosts";
    },
    isGhostDetailsPage() {
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
    AlertLimit
  }
};
</script>
