<template>
  <v-card outlined>
    <v-row align="center">
      <!-- <v-col cols="2" sm="1">
        <v-checkbox
          :style="checkBoxStyle"
          :value="isSelected"
          @change="selectService(index)"
          hide-details
        ></v-checkbox>
      </v-col> -->
      <v-col cols="10" sm="9">
        <h1>
          {{ serviceName }}
        </h1>
        <v-btn
          :style="btnStyle"
          :to="{ name: 'serviceUpdate', params: { index } }"
          outlined
          rounded
          x-small
          ligth
        >
          Update <v-icon x-small>{{ mdiCircleEditOutline }}</v-icon>
        </v-btn>
        <v-btn
          :style="btnStyle"
          :to="{ name: 'micropageUpdate', params: { index } }"
          outlined
          rounded
          x-small
          ligth
        >
          Update Micropage <v-icon x-small>{{ mdiCircleEditOutline }}</v-icon>
        </v-btn>
        <AddInstances
          :index="index"
          :domain="domain"
          :service="serviceName"
          :availableInstances="availableInstances"
          :btnStyle="btnStyle"
        />
        <ActiveChannels
          :serviceName="serviceName"
          :index="index"
          :btnStyle="btnStyle"
        />
        <p>
          Micropage:
          <a :href="url" target="_blank">{{ urlToLoweCase }}</a>
        </p>
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
      checkBoxStyle: {
        margin: "0"
      },
      btnStyle: {
        color: "#58595B",
        margin: "0.3em 1em 0.3em 0"
      }
    };
  },
  methods: {
    // selectService(index) {
    //   this.$store.commit("servicesModule/selectService", index);
    // }
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
    // isSelected() {
    //   const service = this.$store.state.servicesModule.services[this.index];
    //   return service.isSelected === true;
    // }
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
</style>
