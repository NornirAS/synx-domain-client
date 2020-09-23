<template>
  <v-card outlined>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <v-row justify="center" align="center">
      <v-col sm="4">
        <div style="height: 45px">
          <span class="available-instances">{{ availableInstances }}</span>
          <span class="limit-instances">/{{ limitInstances }}</span>
        </div>
        <p class="p-margin" :style="pStyle">Available Instances</p>
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
export default {
  props: ["title", "description", "availableInstances", "limitInstances"],
  data() {
    return {
      mdiPlus,
      colorBlue: "#27AAE1",
      pStyle: {
        color: "#58595b",
        fontSize: "14px"
      }
    };
  }
};
</script>

<style scoped>
.p-margin {
  margin: 0;
}
.available-instances {
  color: #27aae1;
  font-size: 40px;
  font-weight: 500;
}
.limit-instances {
  color: #58595b;
  font-size: 30px;
  font-weight: 500;
}
</style>
