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
      <v-row justify="space-between" align="center">
        <v-col cols="12" md="6">
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
      </v-row>
      <hr />
      <v-row justify="space-between" align="center">
        <v-col cols="12" v-if="!servicesIsEmpty">
          <service-card
            v-for="(service, index) in serviceFilter"
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
import ServiceCard from "../components/service/ServiceCard.vue";
export default {
  data() {
    return {
      title: "Services",
      search: "",
      colorBlue: "#27AAE1"
    };
  },
  created() {
    this.$socket.emit("get_all_services", this.domain, this.token);
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
    serviceFilter() {
      return this.services.filter(
        service =>
          service.serviceName.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
      );
    },
    servicesIsEmpty() {
      return _.isEmpty(this.services);
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
