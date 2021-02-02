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
            <v-container>
              <div class="title">Domain*</div>
              <div class="body-1">
                Choose which domain you want to add the service to.
              </div>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :disabled="isServiceUpdate"
                    :dark="!isServiceUpdate"
                    class="text-none domain-dropdown"
                    color="secondary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <strong>{{ selectedDomain }}</strong>
                    .cioty.com
                    <v-icon v-if="!isServiceUpdate" right large>{{
                      mdiMenuDown
                    }}</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(domain, index) in domainNamesArray"
                    :key="index"
                  >
                    <v-list-item-title @click="selectDomain(domain)">
                      {{ domain }}.cioty.com
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <div>
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
              </div>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-container>
              <div class="title">Service Settings - for Machines</div>
              <service-form></service-form>
              <div>
                <v-btn
                  @click="e1 = 1"
                  class="text-capitalize"
                  color="secondary"
                  text
                >
                  Previous
                </v-btn>
                <v-btn
                  @click="isServiceFormValid ? (e1 = 3) : (e1 = 2)"
                  class="text-capitalize"
                  color="primary"
                  type="submit"
                  form="service-form"
                  small
                  rounded
                >
                  Next
                </v-btn>
              </div>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-container>
              <div class="title">Micropage - Information for Humans</div>
              <div class="body-1">
                The micropage tells yourself and other humans what your service
                is all about. The page will be visible to everyone entering the
                URL.
              </div>
              <micropage-form></micropage-form>
              <div>
                <v-btn
                  @click="e1 = 2"
                  class="text-capitalize"
                  color="secondary"
                  text
                >
                  Previous
                </v-btn>
                <v-btn
                  class="text-capitalize"
                  color="primary"
                  type="submit"
                  form="micropage-form"
                  small
                  rounded
                >
                  Complete
                </v-btn>
              </div>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
  </page-layout>
</template>

<script>
import _ from "lodash";
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
    if (!this.noDomains) {
      this.selectedDomain = this.domainNamesArray[0];
      this.$store.commit(
        "serviceFormModule/addDomain",
        this.domainNamesArray[0]
      );
    }
    if (this.isServiceUpdate) {
      this.title = "Update Morphic Service";
    } else {
      this.title = "New Morphic Service";
    }
  },
  beforeDestroy() {
    this.$store.commit("serviceFormModule/resetServiceForm");
  },
  mounted() {
    if (this.isServiceUpdate) {
      this.selectedDomain = this.domain;
    } else {
      this.selectedDomain = this.domainNamesArray[0];
    }
  },
  methods: {
    selectDomain(domain) {
      this.selectedDomain = domain;
      this.$store.commit("serviceFormModule/addDomain", domain);
    },
    backToServices() {
      this.$router.push({ name: "services" });
    },
    registerService() {
      if (this.isServiceFormValid && this.isMicropageFormValid) {
        this.$socket.emit("register_service", {
          domain: this.domain,
          token: this.token,
          username: this.username,
          serviceName: this.serviceName,
          serviceSchema: this.serviceSchema,
          inlinePreScript: this.inlinePreScript,
          inlinePostScript: this.inlinePostScript,
          commandSchema: this.commandSchema,
          webJS: this.webJS,
          timeout: this.timeout,
          serviceDescription: this.serviceDescription,
          keywords: this.keywordsString,
          schemaDescription: this.schemaDescription
        });
      }
    },
    updateService() {
      if (this.isServiceFormValid && this.isMicropageFormValid) {
        this.$socket.emit("update_service", {
          domain: this.domain,
          token: this.token,
          serviceName: this.serviceName,
          serviceSchema: this.serviceSchema,
          inlinePreScript: this.inlinePreScript,
          inlinePostScript: this.inlinePostScript,
          commandSchema: this.commandSchema,
          webJS: this.webJS,
          timeout: this.timeout,
          serviceDescription: this.serviceDescription,
          keywords: this.keywordsString,
          schemaDescription: this.schemaDescription
        });
      }
    }
  },
  computed: {
    isServiceFormValid() {
      return this.$store.state.serviceFormModule.isServiceFormValid;
    },
    isMicropageFormValid() {
      return this.$store.state.serviceFormModule.isMicropageFormValid;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    domain() {
      return this.$store.state.serviceFormModule.domain;
    },
    serviceName() {
      return this.$store.state.serviceFormModule.name;
    },
    serviceSchema() {
      return this.$store.state.serviceFormModule.schema;
    },
    inlinePreScript() {
      return this.$store.state.serviceFormModule.inlinePreScript;
    },
    inlinePostScript() {
      return this.$store.state.serviceFormModule.inlinePostScript;
    },
    commandSchema() {
      return this.$store.state.serviceFormModule.command;
    },
    webJS() {
      return this.$store.state.serviceFormModule.webJS;
    },
    timeout() {
      return this.$store.state.serviceFormModule.timeout;
    },
    serviceDescription() {
      return this.$store.state.serviceFormModule.description;
    },
    schemaDescription() {
      return this.$store.state.serviceFormModule.schemaDescription;
    },
    keywords() {
      return this.$store.state.serviceFormModule.keywords;
    },
    keywordsString() {
      return this.keywords.join(" ");
    },
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate" ? true : false;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    },
    domains() {
      const domains = localStorage.getItem("domains");
      return JSON.parse(domains);
    },
    noDomains() {
      return _.isEmpty(this.domains);
    },
    domainNamesArray() {
      if (this.noDomains) {
        return [];
      } else {
        const domainNames = this.domains.map(str => {
          return str.name;
        });
        return domainNames;
      }
    }
  },
  watch: {
    successMessage() {
      this.$router.push({ name: "services" });
    },
    isServiceFormValid(newValue) {
      if (newValue === true) {
        this.e1 = 3;
      } else {
        this.e1 = 2;
      }
    },
    isMicropageFormValid(newValue) {
      if (newValue === true && this.isServiceUpdate) {
        this.updateService();
      } else if (newValue === true) {
        this.registerService();
      } else {
        this.e1 = 3;
      }
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
