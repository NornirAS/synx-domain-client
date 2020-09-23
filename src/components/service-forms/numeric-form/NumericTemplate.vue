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
        <v-btn :color="colorBlue" depressed rounded medium dark>
          <v-icon>{{ mdiPlus }}</v-icon>
          Add Instances
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import CurrentValue from "./CurrentValue.vue";
export default {
  props: ["title", "description", "primaryValue", "secondaryValue", "helper"],
  data() {
    return {
      mdiPlus,
      colorBlue: "#27AAE1"
    };
  },
  components: {
    CurrentValue
  }
};
</script>
