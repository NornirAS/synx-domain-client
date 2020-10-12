<template>
  <v-row justify="center">
    <v-col xs="12" md="10">
      <v-row justify="space-between">
        <v-col>
          <Header :title="title" :color="colorBlue" />
        </v-col>
        <v-col align="right">
          <PrimaryActionBtn
            :primaryActionBtnName="primaryActionBtnName"
            :path="createServicePath"
          />
        </v-col>
      </v-row>
      <v-row>
        <Checkbox />
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
        <v-btn :color="colorRed" :style="filterBtnStyle" rounded dark>
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
      <v-row
        v-for="({ domain, serviceName, instances }, index) in services"
        :key="index"
      >
        <Service
          :title="serviceName"
          :primaryValue="availableInstances(instances)"
          :url="url(domain, serviceName)"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mdiChevronDown } from "@mdi/js";
import PrimaryActionBtn from "../components/buttons/PrimaryActionBtn.vue";
import Service from "../components/service/Service.vue";
import Checkbox from "../components/controls/Checkbox.vue";
import Header from "../components/Header.vue";
export default {
  data() {
    return {
      title: "Services",
      search: "",
      groups: ["test1", "test2"],
      sortList: ["newest", "oldest"],
      mdiChevronDown,
      searchBarStyle: {
        marginTop: "0",
        padding: "0 0.5em 0 0.5em"
      },
      filterBtnStyle: {
        margin: "0 0.75em"
      },
      colorBlue: "#27AAE1",
      colorRed: "#FF6666",
      colorGrey: "#404B5F",
      primaryActionBtnName: "Create Service",
      createServicePath: { name: "createService" }
    };
  },
  created() {
    this.$socket.emit("fetch_all_services", this.token);
  },
  methods: {
    availableInstances(instances) {
      return 1000 - instances;
    },
    url(domain, service) {
      return `https://${domain}.cioty.com/${service}`;
    }
  },
  computed: {
    token() {
      return this.$store.state.idToken;
    },
    services() {
      return this.$store.state.services;
    }
  },
  components: {
    PrimaryActionBtn,
    Service,
    Checkbox,
    Header
  }
};
</script>
