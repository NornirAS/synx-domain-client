<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        Ghosts
      </div>
      <v-btn
        :to="{ name: 'new-ghosts' }"
        slot="action"
        class="text-capitalize"
        small
        rounded
        outlined
        color="primary"
      >
        Look for new ghosts
      </v-btn>
    </page-title>
    <div slot="page-content">
      <domain-empty v-if="noDomains && noServices"></domain-empty>
      <ghosts-empty v-if="!noDomains && noServices"></ghosts-empty>
      <add-ghosts v-if="!noDomains && !noServices"></add-ghosts>
      <v-card v-if="!noDomains && !noServices">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search for ghosts"
          hide-details
          outlined
          dense
          :disabled="noInstances"
        ></v-text-field>
        <v-data-table
          v-if="!noDomains && !noServices && !noInstances"
          @page-count="pageCount = $event"
          :headers="headers"
          :items="instances"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.ghosts`]="{ item }">
            <div class="body-1 text-lowercase">
              <span class="font-weight-bold">{{ item.domain }}</span>
              .cioty.com/
              <span class="font-weight-bold">{{ item.service }}</span>
              <span class="font-weight-bold">#{{ item.instance }}</span>
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
      </v-card>
    </div>
    <div
      v-if="!noInstances && !instancesLengthLessItemsPerPage"
      slot="pagination"
    >
      <v-pagination v-model="page" :length="pageCount" light></v-pagination>
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import { mdiChevronRight } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainEmpty from "../components/empty-page/DomainsEmpty";
import GhostsEmpty from "../components/empty-page/GhostsEmpty";
import AddGhosts from "../components/instance/AddGhosts";
export default {
  data() {
    return {
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
          value: "edit",
          sortable: false
        }
      ]
    };
  },
  created() {
    this.$socket.emit("get_all_instances", this.token);
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
      return localStorage.getItem("domains");
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
