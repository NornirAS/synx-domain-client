<template>
  <v-card v-if="!noServices">
    <div class="d-flex justify-start my-4">
      <v-text-field
        v-model="search"
        :append-icon="mdiMagnify"
        label="Search"
        hide-details
        outlined
        dense
        :disabled="noDomains && noServices"
      ></v-text-field>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            class=" ml-4"
            v-bind="attrs"
            v-on="on"
            :disabled="noDomains && noServices"
          >
            Sort By: <strong>{{ sortByDomain }}</strong>
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
    <no-match v-if="noResultsFound"></no-match>
    <v-data-table
      v-else
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
          <v-icon color="info">
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
</template>

<script>
import { mdiMagnify, mdiMenuDown, mdiChevronRight } from "@mdi/js";
import { rootDomain } from "../../core/config";
import { mapState, mapGetters, mapMutations } from "vuex";
import NoMatch from "../empty-page/NoMatch";
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
  methods: {
    ...mapMutations("serviceForm", ["editService"]),
    selectedDomain(domain) {
      this.sortByDomain = domain;
    },
    serviceToEdit(service) {
      this.editService(service);
      this.$router.push({
        name: "serviceUpdate",
        params: { serviceName: service.serviceName }
      });
    }
  },
  computed: {
    ...mapState("services", ["services"]),
    ...mapGetters("services", ["noServices"]),
    ...mapGetters("domains", ["noDomains", "domainNamesWithAllOption"]),
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
      return this.searchResult.length === 0;
    },
    servicesLengthLessItemsPerPage() {
      return this.searchResult.length <= this.itemsPerPage;
    }
  },
  components: {
    NoMatch
  }
};
</script>
