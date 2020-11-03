<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>Services</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'createService' }"
            :color="colorBlue"
            rounded
            small
            dark
          >
            <v-icon>{{ mdiPlus }}</v-icon>
            Create Service
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="space-between" align="center">
        <v-col cols="4" sm="2" md="1">
          <v-checkbox
            :style="checkBoxStyle"
            @change="selectAllServices"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="4" sm="2" md="2">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="colorGrey"
                :style="filterBtnStyle"
                v-bind="attrs"
                v-on="on"
                rounded
                dark
                small
              >
                Sort By
                <v-icon>{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in sortList" :key="item">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="4" sm="2" md="2">
          <v-btn
            @click="deleteService(selectedServices)"
            :disabled="isSelected"
            :color="colorRed"
            :style="filterBtnStyle"
            :dark="!isSelected"
            rounded
            small
          >
            Delete
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="7">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            :style="searchBarStyle"
          ></v-text-field>
        </v-col>
      </v-row>
      <hr />
      <ServiceCard
        v-for="({ domain, serviceName, instances }, index) in services"
        :key="index"
        :title="serviceName"
        :availableInstances="availableInstances(instances, totalInstances)"
        :totalInstances="totalInstances"
        :url="url(domain, serviceName)"
        :index="index"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mdiChevronDown, mdiPlus } from "@mdi/js";
import ServiceCard from "../components/service/ServiceCard.vue";
export default {
  data() {
    return {
      title: "Services",
      search: "",
      totalInstances: "1000",
      groups: ["test1", "test2"],
      sortList: ["newest", "oldest"],
      mdiChevronDown,
      mdiPlus,
      searchBarStyle: {
        marginTop: "0",
        padding: "0 0.5em 0 0.5em"
      },
      filterBtnStyle: {
        margin: "0 0.75em"
      },
      checkBoxStyle: {
        margin: "0",
        paddingLeft: "1.1em"
      },
      colorBlue: "#27AAE1",
      colorRed: "#FF6666",
      colorGrey: "#404B5F"
    };
  },
  created() {
    this.$store.commit(
      "domainsModule/currentDomain",
      this.$route.params.domainName
    );
    this.$socket.emit("get_all_services", this.domain, this.token);
  },
  methods: {
    availableInstances(instances, totalInstances) {
      return totalInstances - instances;
    },
    url(domain, service) {
      return `https://${domain}.cioty.com/${service}`;
    },
    selectAllServices() {
      this.$store.commit("servicesModule/selectAllServices");
    },
    deleteService(data) {
      const services = [];
      data.forEach(item => {
        let service = {
          serviceName: null,
          instances: null
        };
        service.serviceName = item.serviceName;
        service.instanceToDelete = "0";
        services.push(service);
      });
      this.$socket.emit("delete_service", this.domain, services, this.token);
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
    selectedServices() {
      return this.services.filter(service => service.isSelected === true);
    },
    isSelected() {
      return !this.selectedServices.length > 0 ? true : false;
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
