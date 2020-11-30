<template>
  <v-card outlined>
    <v-row align="center">
      <v-col cols="10" sm="9">
        <h1>
          {{ serviceName }}
          <v-btn
            :color="colorGrey"
            :to="{ name: 'serviceUpdate', params: { index } }"
            outlined
            rounded
            x-small
            icon
          >
            <v-icon x-small>{{ mdiCircleEditOutline }}</v-icon>
          </v-btn>
        </h1>
        <p>
          Micropage:
          <a :href="url" target="_blank">{{ urlToLoweCase }}</a>
        </p>
        <v-btn
          :color="colorLightGrey"
          :to="{ name: 'micropageUpdate', params: { index } }"
          class="text-capitalize"
          rounded
          x-small
          dark
        >
          Update Micropage
        </v-btn>
        <ActiveChannels :serviceName="serviceName" :index="index" />
      </v-col>
      <v-col col="12" sm="3" align="right">
        <display-current-value>
          <div slot="currentValue" :style="divHeight">
            <span :style="primaryStyle">{{ availableInstances }}</span>
            <span :style="secondaryStyle">/</span>
            <span :style="secondaryStyle">{{ totalInstances }}</span>
          </div>
          <p slot="helper" :style="helperStyle">{{ helper }}</p>
        </display-current-value>
        <AddInstances
          :index="index"
          :domain="domain"
          :service="serviceName"
          :availableInstances="availableInstances"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiCircleEditOutline } from "@mdi/js";
import ActiveChannels from "./ActiveChannels";
import AddInstances from "./AddInstances";
import DisplayCurrentValue from "../DisplayCurrentValue.vue";
export default {
  props: ["service", "index"],
  data() {
    return {
      totalInstances: 100,
      mdiCircleEditOutline,
      helper: "Available Instances",
      primaryStyle: {
        color: "#27aae1",
        fontSize: "26px",
        fontWeight: "500"
      },
      secondaryStyle: {
        color: "#58595b",
        fontSize: "16px",
        fontWeight: "500"
      },
      helperStyle: {
        margin: "0",
        color: "#58595b",
        fontSize: "14px"
      },
      divHeight: {
        height: "30px"
      },
      colorGrey: "#58595B",
      colorLightGrey: "#404B5F"
    };
  },
  computed: {
    domain() {
      return this.service.domain;
    },
    serviceName() {
      return this.service.serviceName;
    },
    instances() {
      return this.service.instances;
    },
    availableInstances() {
      return this.totalInstances - this.instances;
    },
    url() {
      return `https://${this.domain}.cioty.com/${this.serviceName}`;
    },
    urlToLoweCase() {
      return this.url.toLowerCase();
    }
  },
  components: {
    DisplayCurrentValue,
    ActiveChannels,
    AddInstances
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 20px;
  font-weight: 500;
}
p {
  color: #58595b;
  font-size: 14px;
  margin-bottom: 0.3em;
}
a {
  color: #27aae1;
}
.v-btn {
  margin: 0.3em 1em 0.3em 0;
}
</style>
