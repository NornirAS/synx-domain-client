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
        v-if="isServices"
        :to="{ name: 'serviceCreate' }"
        slot="action"
        class="text-capitalize"
        rounded
        small
        color="info"
        :disabled="!hasActiveDomains"
      >
        Add Service
      </v-btn>
    </page-title>
    <div slot="page-content">
      <services-empty v-if="!noDomains && noServices"></services-empty>
      <domain-empty v-if="noDomains && noServices"></domain-empty>
      <router-view name="switch-tabs"></router-view>
      <router-view></router-view>
    </div>
  </page-layout>
</template>

<script>
import { mapGetters } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ServicesEmpty from "../components/empty-page/ServicesEmpty";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
export default {
  computed: {
    ...mapGetters("servicesModule", ["noServices"]),
    ...mapGetters("domainsModule", ["noDomains", "hasActiveDomains"]),
    ...mapGetters("serviceFormModule", ["serviceURI", "serviceURL"]),
    title() {
      return this.$route.meta.title;
    },
    isServices() {
      return this.$route.name === "services";
    },
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    isMicropageUpdate() {
      return this.$route.name === "micropageUpdate";
    }
  },
  components: {
    PageLayout,
    PageTitle,
    ServicesEmpty,
    DomainEmpty
  }
};
</script>
