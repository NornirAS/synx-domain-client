<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">{{ title }}</div>
      <v-btn
        v-if="isDomainsPage"
        :to="{ name: 'create-domain' }"
        slot="action"
        class="text-capitalize"
        small
        rounded
        color="info"
      >
        Add domain
      </v-btn>
    </page-title>
    <div slot="page-content">
      <domains-empty v-if="noDomains"></domains-empty>
      <router-view></router-view>
    </div>
  </page-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainsEmpty from "../components/empty-page/DomainsEmpty";
export default {
  created() {
    if (this.noDomains) {
      this.getAllDomains();
    } else {
      this.addDomainsFromStorage;
    }
  },
  methods: {
    ...mapActions("domainsModule", ["addDomainsFromStorage"]),
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
    ...mapState("authModule", ["token", "username"]),
    ...mapState("alarmModule", ["deleteDomainSuccess"]),
    ...mapGetters("domainsModule", ["noDomains", "firstDomain"]),
    title() {
      return this.$route.meta.title;
    },
    isDomainsPage() {
      return this.$route.name === "domains";
    }
  },
  watch: {
    deleteDomainSuccess() {
      this.getAllDomains();
      this.getAllServices();
      this.getOwnedGhosts();
    }
  },
  components: {
    PageTitle,
    PageLayout,
    DomainsEmpty
  }
};
</script>
