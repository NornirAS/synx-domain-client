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
      <services-table v-if="!noDomains && !noServices"></services-table>
    </div>
  </page-layout>
</template>

<script>
import { mapGetters } from "vuex";
import PageTitle from "../PageTitle";
import PageLayout from "../PageLayout";
import ServicesEmpty from "../empty-page/ServicesEmpty";
import DomainEmpty from "../empty-page/DomainsEmpty";
import ServicesTable from "./ServicesTable";
export default {
  computed: {
    ...mapGetters("servicesModule", ["noServices"]),
    ...mapGetters("domainsModule", ["noDomains", "hasActiveDomains"])
  },
  components: {
    PageLayout,
    PageTitle,
    ServicesEmpty,
    DomainEmpty,
    ServicesTable
  }
};
</script>
