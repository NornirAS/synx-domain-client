<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-row justify="start" align="center">
      <v-col sm="2">
        <CurrentValue
          :primaryValue="timeOut"
          :secondaryValue="secondaryValue"
          :helper="helper"
          :primaryStyle="primaryStyle"
          :secondaryStyle="secondaryStyle"
          :divHeight="divHeight"
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :label="title"
          single-line
          dense
          outlined
          hide-details
          type="number"
          min="10"
          max="10000"
          :value="timeOut"
          v-model="serviceTimeOut"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-btn @click="setTimeOut" :color="colorBlue" rounded medium dark>
          Set
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CurrentValue from "./CurrentValue.vue";
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Timeout",
      description:
        "Time for inactive channelrequest before it closes(in seconds). Default 30.",
      serviceTimeOut: "30",
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
      divHeight: {
        height: "45px"
      }
    };
  },
  components: {
    CurrentValue,
    FormHeader
  },
  methods: {
    setTimeOut() {
      this.$store.state.serviceForm.timeOut = this.serviceTimeOut;
      this.serviceTimeOut = "";
    }
  },
  computed: {
    timeOut() {
      return this.$store.state.serviceForm.timeOut;
    }
  }
};
</script>

<style scoped>
.col-sm-4 {
  padding: 0 12px;
}
</style>
