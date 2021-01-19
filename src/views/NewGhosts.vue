<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Look for new ghosts</div>
    </page-title>
    <div slot="page-content">
      <div v-if="isInstances">
        <v-data-table
          @page-count="pageCount = $event"
          :headers="headers"
          :items="instances"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:[`item.confirm`]="{ item }">
            <v-icon small @click="confirm(item)">
              {{ mdiCheck }}
            </v-icon>
          </template>
          <template v-slot:[`item.deny`]="{ item }">
            <v-icon small @click="deny(item)">
              {{ mdiClose }}
            </v-icon>
          </template>
        </v-data-table>
        <v-pagination
          v-model="page"
          :color="colorBlue"
          :length="pageCount"
          light
        ></v-pagination>
      </div>
      <new-ghosts-empty v-else></new-ghosts-empty>
    </div>
  </page-layout>
</template>

<script>
import { mdiCheck, mdiClose } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import NewGhostsEmpty from "../components/empty-page/NewGhostsEmpty";
export default {
  data() {
    return {
      mdiCheck,
      mdiClose,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Domain",
          align: "start",
          value: "domain"
        },
        {
          text: "Service",
          align: "start",
          value: "service"
        },
        {
          text: "Instance",
          align: "center",
          value: "instance"
        },
        {
          text: "Confirm",
          align: "center",
          value: "confirm",
          sortable: false
        },
        {
          text: "Deny",
          align: "center",
          value: "deny",
          sortable: false
        }
      ]
    };
  },
  created() {
    this.$socket.emit("look_for_new_instances", this.token, this.username);
  },
  methods: {
    confirm(item) {
      this.$socket.emit(
        "confirm_instance",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    },
    deny(item) {
      this.$socket.emit(
        "deny_instance",
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
    instances() {
      return this.$store.state.instancesModule.instances;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    },
    isInstances() {
      return this.instances.length !== 0 ? true : false;
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("look_for_new_instances", this.token, this.username);
    }
  },
  components: {
    PageLayout,
    PageTitle,
    NewGhostsEmpty
  }
};
</script>
