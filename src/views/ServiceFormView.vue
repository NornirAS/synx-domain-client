<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">{{ title }}</div>
    </page-title>
    <template slot="page-content">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Domain
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Service Settings
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">
            Micro Page
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div>
              <div class="title">Domain*</div>
              <div class="body-1">
                Choose which domain you want to add the service to.
              </div>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :disabled="hasIndex"
                    :dark="!hasIndex"
                    class="text-none domain-dropdown"
                    color="secondary"
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <strong>{{ selectedDomain }}</strong>
                    .cioty.com
                    <v-icon v-if="!hasIndex" right large>{{
                      mdiMenuDown
                    }}</v-icon>
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
            </div>
            <v-btn
              @click="backToServices"
              class="text-capitalize"
              color="secondary"
              text
            >
              Cancel
            </v-btn>
            <v-btn
              class="text-capitalize"
              color="primary"
              @click="e1 = 2"
              small
              rounded
            >
              Next
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div>
              <div class="title">Service Settings - for Machines</div>
              <service-form></service-form>
            </div>
            <v-btn
              @click="e1 = 1"
              class="text-capitalize"
              color="secondary"
              text
            >
              Previous
            </v-btn>
            <v-btn
              @click="e1 = 3"
              class="text-capitalize"
              color="primary"
              type="submit"
              form="service-form-machines"
              small
              rounded
            >
              Next
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div>
              <div class="title">Micropage - Information for Humans</div>
              <div class="body-1">
                The micropage tells yourself and other humans what your service
                is all about. The page will be visible to everyone entering the
                URL.
              </div>
              <micropage-form></micropage-form>
            </div>
            <v-btn
              @click="e1 = 2"
              class="text-capitalize"
              color="secondary"
              text
            >
              Previous
            </v-btn>
            <v-btn
              @click="e1 = 3"
              class="text-capitalize"
              color="primary"
              type="submit"
              form="micropage-form"
              small
              rounded
            >
              Complete
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
    <router-view :btnName="btnName"></router-view>
  </page-layout>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ServiceForm from "../components/service-form/ServiceForm";
import MicropageForm from "../components/micropage-form/MicropageForm";
export default {
  data() {
    return {
      mdiMenuDown,
      e1: 1,
      title: "",
      selectedDomain: "",
      btnName: ""
    };
  },
  created() {
    if (this.hasIndex) {
      this.$store.commit("servicesModule/serviceIndex", this.serviceIndex);
      if (this.isServiceUpdate) {
        this.title = "Update Service";
      } else if (this.isMicropageUpdate) {
        this.title = "Update Micropage";
      }
      this.btnName = "Update";
    } else {
      this.title = "New Morphic Service";
      this.btnName = "Create";
    }
  },
  beforeDestroy() {
    this.$store.commit("serviceFormModule/resetServiceForm");
  },
  mounted() {
    if (this.hasIndex) {
      this.selectedDomain = this.serviceToEdit.domain;
    } else {
      this.selectedDomain = this.domains[0];
    }
  },
  methods: {
    selectDomain(domain) {
      this.selectedDomain = domain;
      this.$store.commit("serviceFormModule/addDomain", domain);
    },
    backToServices() {
      this.$router.push({ name: "services" });
    }
  },
  computed: {
    serviceToEdit() {
      return this.$store.getters["servicesModule/serviceToEdit"];
    },
    serviceIndex() {
      return this.$route.params.index;
    },
    hasIndex() {
      return this.serviceIndex >= 0 ? true : false;
    },
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate" ? true : false;
    },
    isMicropageUpdate() {
      return this.$route.name === "micropageUpdate" ? true : false;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    },
    domains() {
      const domains = localStorage.getItem("domains");
      if (!domains) {
        return [];
      } else {
        return domains.split(",");
      }
    }
  },
  watch: {
    successMessage() {
      this.$router.push({ name: "services" });
    }
  },
  components: {
    PageLayout,
    PageTitle,
    ServiceForm,
    MicropageForm
  }
};
</script>

<style scoped>
.domain-dropdown {
  margin: 1em 0;
  width: 70%;
}
</style>
