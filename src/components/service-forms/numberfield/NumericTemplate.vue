<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-row justify="center" align="center">
      <v-col sm="4">
        <CurrentValue
          :primaryValue="primaryValue"
          :secondaryValue="secondaryValue"
          :helper="helper"
          :primaryStyle="primaryStyle"
          :secondaryStyle="secondaryStyle"
          :divHeight="divHeight"
        />
      </v-col>
      <v-col sm="4">
        <v-text-field
          :label="title"
          single-line
          dense
          outlined
          hide-details
          type="number"
          min="0"
          max="100"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <PrimaryActionBtn :primaryActionBtnName="primaryActionBtnName" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CurrentValue from "./CurrentValue.vue";
import PrimaryActionBtn from "../../buttons/PrimaryActionBtn.vue";
import FormHeader from "../FormHeader.vue";
export default {
  props: [
    "title",
    "description",
    "primaryValue",
    "secondaryValue",
    "helper",
    "primaryActionBtnName"
  ],
  data() {
    return {
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
    PrimaryActionBtn,
    FormHeader
  }
};
</script>

<style scoped>
.col-sm-4 {
  padding: 0 12px;
}
</style>
