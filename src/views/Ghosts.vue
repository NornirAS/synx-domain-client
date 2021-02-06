<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        Ghosts
      </div>
    </page-title>
    <div slot="page-content">
      <domain-empty v-if="noDomains && noServices"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices"></ghosts-empty>
      <add-ghosts v-if="!noDomains && !noServices"></add-ghosts>
      <v-card v-if="!noInstances">
        <v-row>
          <v-col md="9">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search for ghosts"
              hide-details
              outlined
              dense
              :disabled="noInstances"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="text-none"
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  block
                >
                  <span class="font-weight-bold">{{ selectedItem }}</span>
                  <v-icon right large>{{ mdiMenuDown }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in listItems" :key="index">
                  <v-list-item-title @click="selectGhosts(item)">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-data-table
          v-if="!noInstances"
          @page-count="pageCount = $event"
          :headers="headers"
          :items="searchFilter"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.ghosts`]="{ item }">
            <div class="body-1 text-lowercase">
              <span class="font-weight-bold">{{ item.domain }}</span
              >.cioty.com/<span class="font-weight-bold">{{
                item.service
              }}</span>
              <span class="font-weight-bold">#{{ item.instance }}</span>
            </div>
          </template>
          <template v-slot:[`item.details`]="{ item }">
            <v-btn @click="ghostDetails(item)" class="float-right" icon small>
              <v-icon color="primary">
                {{ mdiChevronRight }}
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-pagination
          v-if="!noInstances && !instancesLengthLessItemsPerPage"
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
import { mdiMenuDown, mdiChevronRight } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
import AddGhosts from "../components/ghost/AddGhosts";
export default {
  data() {
    return {
      mdiMenuDown,
      mdiChevronRight,
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 25,
      headers: [
        {
          text: "Ghosts",
          value: "ghosts",
          sortable: false
        },
        {
          value: "details",
          sortable: false
        }
      ],
      listItems: ["All", "Internal", "External"],
      selectedItem: "All"
    };
  },
  created() {
    this.$socket.emit("get_all_instances", this.token);
  },
  methods: {
    selectGhosts(item) {
      this.selectedItem = item;
    },
    ghostDetails({ domain, service, instance }) {
      this.$store.commit("instancesModule/selectGhost", {
        domain,
        service,
        instance
      });
      this.$router.push({
        name: "ghostDetails",
        params: {
          serviceName: service.toLowerCase(),
          instance
        }
      });
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    services() {
      const services = localStorage.getItem("services");
      return JSON.parse(services);
    },
    noServices() {
      return _.isEmpty(this.services);
    },
    domains() {
      const domains = localStorage.getItem("domains");
      return JSON.parse(domains);
    },
    noDomains() {
      return _.isEmpty(this.domains);
    },
    instances() {
      return this.$store.state.instancesModule.instances;
    },
    noInstances() {
      return _.isEmpty(this.instances);
    },
    instancesLengthLessItemsPerPage() {
      return this.instances.length <= this.itemsPerPage;
    },
    searchFilter() {
      return this.instances.filter(
        instance =>
          instance.domain.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          instance.service.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("get_all_instances", this.token);
    }
  },
  components: {
    PageLayout,
    PageTitle,
    DomainEmpty,
    GhostsEmpty,
    AddGhosts
  }
};
</script>
