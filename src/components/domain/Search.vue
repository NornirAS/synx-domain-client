<template>
  <form-body>
    <h1 slot="title" :style="hStyle">GET YOUR PERFECT DOMAIN</h1>
    <v-row slot="content" justify="start" align="center">
      <v-col sm="4">
        <v-text-field single-line dense outlined hide-details></v-text-field>
      </v-col>
      <v-col sm="2">
        <span :style="hStyle">.cioty.com</span>
      </v-col>
      <v-col sm="2">
        <v-btn :color="colorGreen" rounded outlined>
          <v-icon left>
            {{ mdiMagnify }}
          </v-icon>
          Search
        </v-btn>
      </v-col>
      <SearchResult />
    </v-row>
  </form-body>
</template>

<script>
import { mdiMagnify } from "@mdi/js";
import FormBody from "./FormBody.vue";
import SearchResult from "./SearchResult.vue";
export default {
  data() {
    return {
      mdiMagnify,
      hStyle: {
        color: "#58595B",
        fontSize: "20px",
        fontWeight: "500"
      },
      colorGreen: "#71B663"
    };
  },
  components: {
    FormBody,
    SearchResult
  }
};
</script>
