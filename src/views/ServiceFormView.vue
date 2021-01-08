<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>{{ title }}</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'services' }"
            :color="colorLightGrey"
            class="text-capitalize"
            rounded
            small
            dark
          >
            <v-icon left small>{{ mdiUndoVariant }}</v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="form-container">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="colorLightGrey"
                class="text-none"
                dark
                v-bind="attrs"
                v-on="on"
              >
                For Domain: {{ selectedDomain }}.cioty.com
                <v-icon left large>{{ mdiMenuDown }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(domain, index) in domains" :key="index">
                <v-list-item-title @click="selectDomain(domain)">
                  {{ domain }}.cioty.com
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="form-container">
          <router-view :btnName="btnName"></router-view>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mdiUndoVariant, mdiMenuDown } from "@mdi/js";
export default {
  data() {
    return {
      mdiUndoVariant,
      mdiMenuDown,
      title: "",
      selectedDomain: "",
      btnName: "Update",
      colorLightGrey: "#404B5F"
    };
  },
  created() {
    if (this.index >= 0) {
      this.$store.commit("servicesModule/serviceIndex", this.index);
      this.$store.commit("serviceFormModule/editService", this.service);
      this.title = "Update Service";
      this.btnName = "Update";
    } else {
      this.title = "Create Morphic Service";
      this.btnName = "Create";
    }
  },
  beforeDestroy() {
    this.$store.commit("serviceFormModule/resetServiceForm");
  },
  mounted() {
    this.selectedDomain = this.domains[0];
    this.$store.commit("serviceFormModule/addDomain", this.selectedDomain);
  },
  methods: {
    selectDomain(domain) {
      this.selectedDomain = domain;
      this.$store.commit("serviceFormModule/addDomain", domain);
    }
  },
  computed: {
    service() {
      return this.$store.getters["servicesModule/serviceToEdit"];
    },
    index() {
      return this.$route.params.index;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    },
    domains() {
      return localStorage.getItem("domains").split(",");
    }
  },
  watch: {
    successMessage() {
      this.$router.push({ name: "services" });
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
.form-container {
  padding: 0 12px 12px 12px;
}
</style>
