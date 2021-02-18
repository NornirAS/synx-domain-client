<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        Ghosts
      </div>
    </page-title>
    <div slot="page-content">
      <domain-empty v-if="noDomains && noServices && noGhosts"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices && noGhosts"></ghosts-empty>
      <add-ghost v-if="!noDomains && !noServices"></add-ghost>
      <v-card v-if="!noGhosts">
        <v-row>
          <v-col md="9">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search for ghosts"
              hide-details
              outlined
              dense
              :disabled="noGhosts"
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
        <no-match v-if="noSearchResult"></no-match>
        <v-data-table
          v-if="!noGhosts && !noSearchResult"
          @page-count="pageCount = $event"
          :headers="headers"
          :items="searchFilter"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.allGhosts`]="{ item }">
            <div class="body-1 text-lowercase">
              {{ item.domain }}{{ rootDomain
              }}<span class="font-weight-bold"
                >{{ item.service }}#{{ item.instance }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.details`]="{ item }">
            <div v-if="item.approve" class="float-right">
              <v-btn
                @click="decline(item)"
                class="text-capitalize"
                color="secondary"
                text
                x-small
                >Decline
                <v-icon x-small>{{ mdiClose }}</v-icon>
              </v-btn>
              <v-btn
                @click="accept(item)"
                class="text-capitalize"
                color="primary"
                rounded
                x-small
                >Accept
              </v-btn>
            </div>
            <div v-else>
              <v-btn @click="ghostDetails(item)" class="float-right" icon small>
                <v-icon color="primary">
                  {{ mdiChevronRight }}
                </v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
        <v-pagination
          v-if="!noGhosts && !allGhostsLengthLessItemsPerPage"
          v-model="page"
          :length="pageCount"
          light
        ></v-pagination>
      </v-card>
    </div>
    <div slot="page-content-right">
      <div class="title">About URIs</div>
      <div class="body-1">
        The URI for ghost consist of domain name, service name and ghostID.
        Here's an example:
      </div>
      <div class="body-1 font-weight-bold">
        domain{{ rootDomain }}service#ghostID
      </div>
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import { mdiMenuDown, mdiChevronRight, mdiClose } from "@mdi/js";
import { rootDomain } from "../core/config";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
import AddGhost from "../components/ghosts/AddGhost";
import NoMatch from "../components/empty-page/NoMatch";
export default {
  data() {
    return {
      mdiMenuDown,
      mdiChevronRight,
      mdiClose,
      rootDomain,
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 25,
      headers: [
        {
          text: "Ghosts",
          value: "allGhosts",
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
    this.$socket.emit("look_for_new_ghosts", {
      token: this.token,
      username: this.username
    });
  },
  methods: {
    selectGhosts(item) {
      this.selectedItem = item;
    },
    ghostDetails({ domain, service, instance, mapID }) {
      this.$store.commit("instancesModule/selectGhost", {
        domain,
        service,
        instance,
        mapID
      });
      this.$router.push({
        name: "ghostDetails",
        params: {
          serviceName: service.toLowerCase(),
          instance
        }
      });
    },
    accept(item) {
      this.$socket.emit(
        "accept_ghost",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    },
    decline(item) {
      this.$socket.emit(
        "decline_ghost",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    username() {
      return this.$store.state.authModule.username;
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
    allGhosts() {
      return this.$store.getters["instancesModule/mergedGhostArray"];
    },
    instances() {
      return this.$store.state.instancesModule.instances;
    },
    noGhosts() {
      return _.isEmpty(this.allGhosts);
    },
    allGhostsLengthLessItemsPerPage() {
      return this.allGhosts.length <= this.itemsPerPage;
    },
    searchFilter() {
      return this.allGhosts.filter(
        instance =>
          instance.domain.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          instance.service.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    noSearchResult() {
      return _.isEmpty(this.searchFilter);
    },
    addGhostSuccess() {
      return this.$store.state.alarmModule.addGhostSuccess;
    },
    acceptGhostSuccess() {
      return this.$store.state.alarmModule.acceptGhostSuccess;
    },
    declineGhostSuccess() {
      return this.$store.state.alarmModule.declineGhostSuccess;
    }
  },
  watch: {
    addGhostSuccess() {
      this.$store.commit("instancesModule/resetGhosts");
      this.$socket.emit("get_all_instances", this.token);
    },
    acceptGhostSuccess() {
      this.$store.commit("instancesModule/resetGhosts");
      this.$socket.emit("get_all_instances", this.token);
      this.$socket.emit("look_for_new_ghosts", {
        token: this.token,
        username: this.username
      });
    },
    declineGhostSuccess() {
      this.$store.commit("instancesModule/resetGhosts");
      this.$socket.emit("get_all_instances", this.token);
      this.$socket.emit("look_for_new_ghosts", {
        token: this.token,
        username: this.username
      });
    }
  },
  components: {
    PageLayout,
    PageTitle,
    DomainEmpty,
    GhostsEmpty,
    AddGhost,
    NoMatch
  }
};
</script>
