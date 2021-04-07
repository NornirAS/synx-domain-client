<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ title }}
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
    }
  },
  computed: {
    ...mapState("authentication", ["token", "username"]),
    ...mapGetters("services", ["noServices"]),
    ...mapGetters("domains", ["noDomains"]),
    ...mapGetters("ghosts", ["noGhosts"]),
    ...mapState("alert", [
      "addGhostSuccess",
      "acceptGhostSuccess",
      "declineGhostSuccess",
      "removeGhostSuccess"
    ]),
    title() {
      return this.$route.meta.title;
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
