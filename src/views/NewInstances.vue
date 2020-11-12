<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row>
        <v-col>
          <h1>Look for new instances</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
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
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCheck, mdiClose } from "@mdi/js";
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
          value: "confirm"
        },
        {
          text: "Deny",
          align: "center",
          value: "deny"
        }
      ],
      colorBlue: "#27AAE1"
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
      return this.$store.state.instancesModule.instancesToAprove;
    }
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
</style>
