<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Morphic Services</div>
      <v-btn
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
      <router-view v-if="!noDomains && !noServices"></router-view>
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
    ...mapGetters("domainsModule", ["noDomains", "hasActiveDomains"])
  },
  components: {
    PageLayout,
    PageTitle,
    ServicesEmpty,
    DomainEmpty
  }
};
</script>
