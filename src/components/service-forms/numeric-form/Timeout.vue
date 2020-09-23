<template>
  <v-card outlined>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <v-row justify="center" align="center">
      <v-col sm="4">
        <div style="height: 45px">
          <span class="current-timeout">{{ currentTimeout }}</span>
          <span class="limit-instances">'s</span>
        </div>
        <p class="p-margin" :style="pStyle">Current Timeout</p>
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
          value="30"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-btn :color="colorBlue" depressed rounded medium dark>
          <v-icon>{{ mdiPlus }}</v-icon>
          Set Timeout
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiPlus } from "@mdi/js";
export default {
  data() {
    return {
      title: "Timeout",
      description:
        "Time for inactive channelrequest before it closes(in seconds). Default 30.",
      currentTimeout: "30",
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
.current-timeout {
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
