<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Services</div>
      <v-btn
        :to="{ name: 'serviceCreate' }"
        slot="action"
        class="text-capitalize"
        rounded
        outlined
        small
        color="primary"
      >
        Create Service
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
            :disabled="!services"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  class="text-capitalize"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  block
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
      <service-card
        v-for="(service, index) in searchFilter"
        :key="index"
        :index="index"
        :service="service"
      >
      </service-card>
    </div>
  </page-layout>
</template>

<script>
import _ from "underscore";
import { mdiMenuDown } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ServiceCard from "../components/service/ServiceCard";
import ServicesEmpty from "../components/empty-page/ServicesEmpty";
export default {
  data() {
    return {
      mdiMenuDown,
      search: "",
      sortByDomain: "All"
    };
  },
  created() {
    this.$socket.emit("get_all_services", this.token);
  },
  methods: {
    selectedDomain(domain) {
      this.sortByDomain = domain;
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    services() {
      return this.$store.state.servicesModule.services;
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
      const domains = localStorage.getItem("domains").split(",");
      domains.unshift("All");
      return domains;
    }
  },
  components: {
    ServiceCard,
    PageLayout,
    PageTitle,
    ServicesEmpty
  }
};
</script>
