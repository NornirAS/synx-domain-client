<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row justify="start" align="center">
      <v-col cols="12">
        <display-current-value>
          <div slot="currentValue" :style="divHeight">
            <span :style="primaryStyle">{{ timeOut }}</span>
            <span :style="secondaryStyle">/</span>
            <span :style="secondaryStyle">{{ secondaryValue }}</span>
          </div>
          <p slot="helper" :style="helperStyle">{{ helper }}</p>
        </display-current-value>
      </v-col>
      <v-col cols="8">
        <v-text-field
          :label="title"
          dense
          outlined
          hide-details
          type="number"
          min="10"
          max="10000"
          v-model="serviceTimeOut"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn @click="setTimeOut" :color="colorBlue" rounded medium dark>
          Set
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DisplayCurrentValue from "../../DisplayCurrentValue.vue";
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Timeout",
      description:
        "Time for inactive channelrequest before it closes(in seconds). Default 30.",
      serviceTimeOut: null,
      secondaryValue: "s",
      helper: "Current Timeout",
      primaryActionBtnName: "Set Timeout",
      colorBlue: "#27AAE1",
      primaryStyle: {
        color: "#27aae1",
        fontSize: "40px",
        fontWeight: "500"
      },
      secondaryStyle: {
        color: "#58595b",
        fontSize: "30px",
        fontWeight: "500"
      },
      helperStyle: {
        margin: "0",
        color: "#58595b",
        fontSize: "14px"
      },
      divHeight: {
        height: "45px"
      }
    };
  },
  components: {
    DisplayCurrentValue,
    FormHeader
  },
  methods: {
    setTimeOut() {
      this.$store.commit("serviceModule/setTimeout", this.serviceTimeOut);
      this.serviceTimeOut = null;
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    timeOut() {
      return this.serviceModule.serviceForm.timeOut;
    }
  }
};
</script>
