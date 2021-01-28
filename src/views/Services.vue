<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Morphic Services</div>
      <v-btn
        :to="{ name: 'serviceCreate' }"
        slot="action"
        class="text-capitalize"
        rounded
        outlined
        small
        color="primary"
        :disabled="!domains"
      >
        Add Service
      </v-btn>
    </page-title>
    <div slot="page-search">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            outlined
            dense
            :disabled="!domains && noServices"
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
                  :disabled="!domains && noServices"
                >
                  Sort By: {{ sortByDomain }}
                  <v-icon left large>{{ mdiMenuDown }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(domain, index) in domains" :key="index">
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
      <services-empty v-if="searchFilterIsEmpty"></services-empty>
      <template>
        <v-data-table
          @page-count="pageCount = $event"
          :headers="headers"
          :items="searchFilter"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.serviceURL`]="{ item }">
            <div class="body-1">
              https://{{ item.domain }}.cioty.com/
              <strong>{{ item.serviceName }}</strong>
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
      </template>
    </div>
    <div slot="pagination">
      <v-pagination v-model="page" :length="pageCount" light></v-pagination>
    </div>
  </page-layout>
</template>

<script>
import _ from "underscore";
import { mdiMenuDown, mdiChevronRight } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ServicesEmpty from "../components/empty-page/ServicesEmpty";
export default {
  data() {
    return {
      mdiMenuDown,
      mdiChevronRight,
      search: "",
      sortByDomain: "All",
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "ServiceURL",
          value: "serviceURL"
        },
        {
          value: "edit"
        }
      ]
    };
  },
  created() {
    this.$socket.emit("get_all_services", this.token);
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
      return this.$store.state.authModule.idToken;
    },
    services() {
      return this.$store.state.servicesModule.services;
    },
    noServices() {
      return _.isEmpty(this.services);
    },
    sortBy() {
      return this.sortByDomain === "All"
        ? this.services
        : this.services.filter(service => service.domain === this.sortByDomain);
    },
    searchFilter() {
      return this.sortBy.filter(
        service =>
          service.serviceName.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
      );
    },
    searchFilterIsEmpty() {
      return _.isEmpty(this.searchFilter);
    },
    domains() {
      const domains = localStorage.getItem("domains");
      if (!domains) {
        return false;
      } else {
        const domainsArray = domains.split(" ");
        domainsArray.unshift("All");
        return domainsArray;
      }
    }
  },
  components: {
    PageLayout,
    PageTitle,
    ServicesEmpty
  }
};
</script>
