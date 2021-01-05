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
        <v-col cols="12">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :index="index"
            :service="service"
          />
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
    this.$store.commit(
      "domainsModule/currentDomain",
      this.$route.params.domainName
    );
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
</style>
