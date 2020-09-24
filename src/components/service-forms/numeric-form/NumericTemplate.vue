<template>
  <v-card outlined>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <v-row justify="center" align="center">
      <v-col sm="4">
        <CurrentValue
          :primaryValue="primaryValue"
          :secondaryValue="secondaryValue"
          :helper="helper"
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
export default {
  props: [
    "title",
    "description",
    "primaryValue",
    "secondaryValue",
    "helper",
    "primaryActionBtnName"
  ],
  components: {
    CurrentValue,
    PrimaryActionBtn
  }
};
</script>
