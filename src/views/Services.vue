<template>
  <v-row justify="center">
    <v-col xs="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <Header :title="title" :color="colorBlue" />
        </v-col>
        <v-col align="right">
          <v-btn :color="colorBlue" rounded medium dark :to="path">
            <v-icon>{{ mdiPlus }}</v-icon>
            {{ primaryActionBtnName }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-checkbox
          :style="checkBoxStyle"
          @change="selectAllServices"
        ></v-checkbox>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="colorGrey"
              :style="filterBtnStyle"
              rounded
              dark
              v-bind="attrs"
              v-on="on"
            >
              Groups
              <v-icon>{{ mdiChevronDown }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="item in groups" :key="item">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="colorGrey"
              :style="filterBtnStyle"
              rounded
              dark
              v-bind="attrs"
              v-on="on"
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
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          :style="searchBarStyle"
        ></v-text-field>
        <v-btn
          @click="deleteService(selectedServices)"
          :disabled="isSelected"
          :color="colorRed"
          :style="filterBtnStyle"
          rounded
          dark
        >
          Delete
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="colorGrey"
              :style="filterBtnStyle"
              rounded
              dark
              v-bind="attrs"
              v-on="on"
            >
              Move To
              <v-icon>{{ mdiChevronDown }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="item in sortList" :key="item">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <hr />
      <Service
        v-for="({ domain, serviceName, instances }, index) in services"
        :key="index"
        :title="serviceName"
        :availableInstances="availableInstances(instances, limitInstances)"
        :limitInstances="limitInstances"
        :url="url(domain, serviceName)"
        :index="index"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mdiChevronDown, mdiPlus } from "@mdi/js";
import Service from "../components/service/Service.vue";
import Header from "../components/Header.vue";
export default {
  data() {
    return {
      title: "Services",
      search: "",
      limitInstances: "1000",
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
        paddingTop: "0.5em"
      },
      colorBlue: "#27AAE1",
      colorRed: "#FF6666",
      colorGrey: "#404B5F",
      primaryActionBtnName: "Create Service",
      createServicePath: { name: "createService" }
    };
  },
  created() {
    this.$store.state.domain = this.$route.params.name;
    this.$socket.emit("get_all_services", this.domain, this.token);
  },
  methods: {
    availableInstances(instances, limitInstances) {
      return limitInstances - instances;
    },
    url(domain, service) {
      return `https://${domain}.cioty.com/${service}`;
    },
    selectAllServices() {
      this.$store.dispatch("selectAllServices");
    },
    deleteService(data) {
      const services = [];
      data.forEach(item => {
        let service = {
          serviceName: null,
          instances: null
        };
        service.serviceName = item.serviceName;
        service.instances = "0";
        services.push(service);
      });
      this.$socket.emit("delete_service", this.domain, services, this.token);
    }
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
    token() {
      return this.$store.state.idToken;
    },
    services() {
      const services = this.$store.state.services;
      const domain = this.$store.state.domain;
      const result = services.filter(service => service.domain === domain);
      return result;
    },
    selectedServices() {
      return this.$store.state.services.filter(
        service => service.isSelected === true
      );
    },
    isSelected() {
      return !this.selectedServices.length > 0 ? true : false;
    }
  },
  components: {
    Service,
    Header
  }
};
</script>
