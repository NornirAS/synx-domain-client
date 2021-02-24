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
        color="primary"
        :disabled="noDomains"
      >
        Add Service
      </v-btn>
    </page-title>
    <div slot="page-search">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="search"
            :append-icon="mdiMagnify"
            label="Search"
            hide-details
            outlined
            dense
            :disabled="noDomains && noServices"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  class="text-capitalize"
                  v-bind="attrs"
                  v-on="on"
                  block
                  :disabled="noDomains && noServices"
                >
                  Sort By: {{ sortByDomain }}
                  <v-icon left large>{{ mdiMenuDown }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(domain, index) in domainNamesWithAllOption"
                  :key="index"
                >
                  <v-list-item-title @click="selectedDomain(domain)">
                    {{ domain }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </div>
    <div slot="page-content">
      <services-empty v-if="!noDomains && noServices"></services-empty>
      <domain-empty v-if="noDomains && noServices"></domain-empty>
      <no-match v-if="noResultsFound && !noServices"></no-match>
      <v-card v-if="!noResultsFound">
        <v-data-table
          @page-count="pageCount = $event"
          :headers="headers"
          :items="searchResult"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.serviceURI`]="{ item }">
            <div class="body-1">
              {{ item.domain }}{{ rootDomain
              }}<span class="font-weight-bold">{{ item.serviceName }}</span>
            </div>
          </template>
          <template v-slot:[`item.edit`]="{ item }">
            <v-btn @click="serviceToEdit(item)" class="float-right" icon small>
              <v-icon color="primary">
                {{ mdiChevronRight }}
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-pagination
          v-if="!noResultsFound && !servicesLengthLessItemsPerPage"
          v-model="page"
          :length="pageCount"
          light
        ></v-pagination>
      </v-card>
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import { mdiMagnify, mdiMenuDown, mdiChevronRight } from "@mdi/js";
import { rootDomain } from "../core/config";
import { mapGetters } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ServicesEmpty from "../components/empty-page/ServicesEmpty";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import NoMatch from "../components/empty-page/NoMatch";
export default {
  data() {
    return {
      mdiMagnify,
      mdiMenuDown,
      mdiChevronRight,
      rootDomain,
      search: "",
      sortByDomain: "All",
      page: 1,
      pageCount: 0,
      itemsPerPage: 25,
      headers: [
        {
          text: "ServiceURI",
          value: "serviceURI",
          sortable: false
        },
        {
          value: "edit",
          sortable: false
        }
      ]
    };
  },
  created() {
    if (this.noServices) {
      this.$socket.emit("get_all_services", this.token);
    } else {
      this.$store.dispatch("servicesModule/addServicesFromStorage");
    }
  },
  methods: {
    selectedDomain(domain) {
      this.sortByDomain = domain;
    },
    serviceToEdit(service) {
      this.$store.commit("serviceFormModule/editService", service);
      this.$router.push({
        name: "serviceUpdate",
        params: { serviceName: service.serviceName }
      });
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.token;
    },
    services() {
      return this.$store.state.servicesModule.services;
    },
    ...mapGetters("servicesModule", ["noServices"]),
    ...mapGetters("domainsModule", ["noDomains", "domainNamesWithAllOption"]),
    sortBy() {
      return this.sortByDomain === "All"
        ? this.services
        : this.services.filter(service => service.domain === this.sortByDomain);
    },
    searchResult() {
      return this.sortBy.filter(
        service =>
          service.serviceName.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
      );
    },
    noResultsFound() {
      return _.isEmpty(this.searchResult);
    },
    servicesLengthLessItemsPerPage() {
      return this.searchResult.length <= this.itemsPerPage;
    }
  },
  components: {
    PageLayout,
    PageTitle,
    ServicesEmpty,
    DomainEmpty,
    NoMatch
  }
};
</script>
