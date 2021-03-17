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
      <add-ghost v-if="hasActiveDomains && !noServices"></add-ghost>
      <v-card v-if="!noGhosts">
        <div class="d-flex justify-start my-4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search for ghosts"
            hide-details
            outlined
            dense
            :disabled="noGhosts"
          ></v-text-field>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="text-none ml-4"
                color="primary"
                v-bind="attrs"
                v-on="on"
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
        </div>
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
                >{{ item.service }}##{{ item.instance }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.details`]="{ item }">
            <div v-if="item.approve" class="float-right">
              <v-btn
                @click="decline(item)"
                class="text-capitalize"
                color="primary"
                text
                x-small
                >Decline
                <v-icon x-small>{{ mdiClose }}</v-icon>
              </v-btn>
              <v-btn
                @click="accept(item)"
                class="text-capitalize"
                color="info"
                rounded
                x-small
                >Accept
              </v-btn>
            </div>
            <div v-else>
              <v-btn @click="ghostDetails(item)" class="float-right" icon small>
                <v-icon color="info">
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
        domain{{ rootDomain }}service##ghostID
      </div>
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import { mdiMenuDown, mdiChevronRight, mdiClose } from "@mdi/js";
import { rootDomain } from "../../core/config";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import PageTitle from "../PageTitle";
import PageLayout from "../PageLayout";
import DomainEmpty from "../empty-page/DomainsEmpty";
import GhostsEmpty from "../empty-page/GhostsEmpty";
import AddGhost from "../ghosts/AddGhost";
import NoMatch from "../empty-page/NoMatch";
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
    if (this.noGhosts) {
      this.getOwnedGhosts();
    } else {
      this.addGhostsFromStorage();
    }
    this.lookForNewGhosts();
  },
  methods: {
    ...mapMutations("ghostDetails", ["selectGhost"]),
    ...mapActions("ghosts", ["addGhostsFromStorage"]),
    getOwnedGhosts() {
      this.$socket.emit("get_owned_ghosts", {
        token: this.token
      });
    },
    lookForNewGhosts() {
      this.$socket.emit("look_for_new_ghosts", {
        token: this.token,
        username: this.username
      });
    },
    selectGhosts(item) {
      this.selectedItem = item;
    },
    ghostDetails(ghost) {
      this.selectGhost(ghost);
      this.toGhostDetails(ghost);
    },
    toGhostDetails({ service, instance }) {
      this.$router.push({
        name: "ghostDetails",
        params: {
          serviceName: service.toLowerCase(),
          instance
        }
      });
    },
    accept(item) {
      this.$socket.emit("accept_ghost", {
        domain: item.domain,
        service: item.service,
        token: this.token,
        username: this.username,
        instance: item.instance
      });
    },
    decline(item) {
      this.$socket.emit("decline_ghost", {
        domain: item.domain,
        service: item.service,
        token: this.token,
        username: this.username,
        instance: item.instance
      });
    }
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    ...mapGetters("servicesModule", ["noServices"]),
    ...mapGetters("domainsModule", ["noDomains", "hasActiveDomains"]),
    ...mapGetters("ghosts", ["allGhosts", "noGhosts"]),
    ...mapState("alarmModule", [
      "addGhostSuccess",
      "acceptGhostSuccess",
      "declineGhostSuccess",
      "removeGhostSuccess"
    ]),
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
    }
  },
  watch: {
    addGhostSuccess() {
      this.getOwnedGhosts();
    },
    acceptGhostSuccess() {
      this.getOwnedGhosts();
      this.lookForNewGhosts();
    },
    declineGhostSuccess() {
      this.getOwnedGhosts();
      this.lookForNewGhosts();
    },
    removeGhostSuccess() {
      this.getOwnedGhosts();
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
