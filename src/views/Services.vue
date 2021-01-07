<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>Services</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'serviceCreate' }"
            :color="colorBlue"
            class="text-capitalize"
            rounded
            small
            dark
          >
            Create Service
          </v-btn>
        </v-col>
      </v-row>
      <hr />
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            outlined
            dense
            :disabled="servicesIsEmpty"
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :color="colorLightGrey"
                  class="text-capitalize"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  block
                >
                  Sort by domain
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
      <hr />
      <v-row justify="space-between" align="center">
        <v-col cols="12" v-if="!servicesIsEmpty">
          <service-card
            v-for="(service, index) in serviceSearchFilter"
            :key="index"
            :index="index"
            :service="service"
          >
          </service-card>
        </v-col>
        <v-col v-else>
          <v-img
            alt="EmptyBox"
            contain
            src="../assets/empty-box.png"
            transition="scale-transition"
            height="300px"
          >
            <p class="font-weight-bold">
              You have no services available...
            </p>
          </v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import _ from "underscore";
import { mdiMenuDown } from "@mdi/js";
import ServiceCard from "../components/service/ServiceCard.vue";
export default {
  data() {
    return {
      mdiMenuDown,
      title: "Services",
      search: "",
      sortByDomain: "",
      colorBlue: "#27AAE1",
      colorLightGrey: "#404B5F"
    };
  },
  created() {
    this.$socket.emit("get_all_services", this.domain, this.token);
  },
  methods: {
    selectedDomain(domain) {
      this.sortByDomain = domain;
    }
  },
  computed: {
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    services() {
      return this.$store.getters["servicesModule/servicesForDomain"];
    },
    serviceSearchFilter() {
      return this.services.filter(
        service =>
          service.serviceName.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 && service.domain === this.sortByDomain.toLowerCase()
      );
    },
    servicesIsEmpty() {
      return _.isEmpty(this.services);
    },
    domains() {
      return localStorage
        .getItem("domains")
        .toUpperCase()
        .split(",");
    }
  },
  components: {
    ServiceCard
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
p {
  margin: 0;
  color: #58595b;
  font-size: 16px;
}
</style>
