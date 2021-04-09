<template>
  <v-card v-if="!noGhosts">
    <div class="d-flex justify-start my-4">
      <v-text-field
        v-model="search"
        :append-icon="mdiMagnify"
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
      listItems: ["All", "Internal", "External"],
      selectedItem: "All"
    };
  },
  methods: {
    ...mapMutations("ghostDetails", ["selectGhost"]),
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
    ...mapGetters("ghosts", ["allGhosts", "noGhosts"]),
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
      return this.searchFilter.length === 0;
    }
  },
  components: {
    NoMatch
  }
};
</script>