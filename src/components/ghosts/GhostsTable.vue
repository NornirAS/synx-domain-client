<template>
  <v-card v-if="!noServices">
    <div class="d-flex justify-start my-4">
      <v-text-field
        v-model="search"
        :append-icon="mdiMagnify"
        label="Search for ghosts"
        hide-details
        outlined
        dense
      ></v-text-field>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-4" color="primary" v-bind="attrs" v-on="on">
            <span class="font-weight-bold">{{ ghostOrigin }}</span>
            <v-icon right large>{{ mdiMenuDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in ghostOrigins" :key="index">
            <v-list-item-title @click="selectGhostOrigin(item)">
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <no-match v-if="noSearchResult && !noGhosts && !noServices"></no-match>
    <v-data-table
      v-if="!noSearchResult"
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
            color="error"
            text
            x-small
            >Decline
            <v-icon x-small>{{ mdiClose }}</v-icon>
          </v-btn>
          <v-btn
            @click="accept(item)"
            class="text-capitalize"
            color="accent"
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
    ></v-pagination>
  </v-card>
</template>

<script>
import { mdiMagnify, mdiMenuDown, mdiChevronRight, mdiClose } from "@mdi/js";
import { mapGetters, mapMutations } from "vuex";
import { rootDomain } from "../../core/config";
import NoMatch from "../empty-page/NoMatch";
export default {
  data() {
    return {
      mdiMagnify,
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
      ghostOrigins: ["All", "Internal", "External"],
      ghostOrigin: "All"
    };
  },
  methods: {
    ...mapMutations("ghostDetails", ["selectGhost"]),
    selectGhostOrigin(item) {
      this.ghostOrigin = item;
    },
    ghostDetails(ghost) {
      this.selectGhost(ghost);
      this.toGhostDetails(ghost);
    },
    toGhostDetails({ domain, service, instance }) {
      this.$router.push({
        name: "ghostOverview",
        params: {
          domain: domain.toLowerCase(),
          service: service.toLowerCase(),
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
    ...mapGetters("ghosts", ["allGhosts", "noGhosts"]),
    ...mapGetters("services", ["noServices"]),
    ...mapGetters("domains", ["domainNames"]),
    sortedGhostsByOrigin() {
      if (this.ghostOrigin === "Internal") {
        return this.allGhosts.filter(ghost =>
          this.domainNames.includes(ghost.domain.toLowerCase())
        );
      } else if (this.ghostOrigin === "External") {
        return this.allGhosts.filter(
          ghost => !this.domainNames.includes(ghost.domain.toLowerCase())
        );
      } else {
        return this.allGhosts;
      }
    },
    searchFilter() {
      return this.sortedGhostsByOrigin.filter(
        instance =>
          instance.domain.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          instance.service.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    noSearchResult() {
      return this.searchFilter.length === 0;
    },
    allGhostsLengthLessItemsPerPage() {
      return this.sortedGhostsByOrigin.length <= this.itemsPerPage;
    }
  },
  components: {
    NoMatch
  }
};
</script>
