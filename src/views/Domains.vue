<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">{{ title }}</div>
      <v-btn
        v-if="isDomainsPage && !noDomains"
        :to="{ name: 'create-domain' }"
        slot="action"
        color="primary"
      >
        Add domain
      </v-btn>
    </page-title>
    <div slot="page-content">
      <domains-empty v-if="noDomains && isDomainsPage"></domains-empty>
      <router-view></router-view>
    </div>
  </page-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PageTitle from "../components/globals/PageTitle";
import PageLayout from "../components/globals/PageLayout";
import DomainsEmpty from "../components/empty-page/DomainsEmpty";
export default {
  created() {
    if (this.noDomains) this.getAllDomains();
  },
  methods: {
    getAllDomains() {
      this.$socket.emit("get_all_domains", {
        token: this.token,
        username: this.username
      });
    },
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
    ...mapState("authentication", ["token", "username"]),
    ...mapState("alert", ["createDomainSuccess", "deleteDomainSuccess"]),
    ...mapGetters("domains", ["noDomains", "firstDomain"]),
    title() {
      return this.$route.meta.title;
    },
    isDomainsPage() {
      return this.$route.name === "domains";
    }
  },
  watch: {
    createDomainSuccess() {
      this.getAllDomains();
    },
    deleteDomainSuccess() {
      this.getAllDomains();
      this.getAllServices();
      this.getOwnedGhosts();
    },
    firstDomain() {
      this.getAllServices();
    }
  },
  components: {
    PageTitle,
    PageLayout,
    DomainsEmpty
  }
};
</script>
