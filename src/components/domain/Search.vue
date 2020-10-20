<template>
  <div>
    <h1 align="center">{{ title.toUpperCase() }}</h1>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-text-field
          label="Domain Name"
          prefix="https://"
          suffix=".cioty.com"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn small outlined rounded dark>
          <v-icon left>{{ mdiMagnify }}</v-icon>
          Search
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <p>Success</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiMagnify } from "@mdi/js";
export default {
  data() {
    return {
      mdiMagnify,
      title: "Get your perfect domain"
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
  color: #58595b;
  font-weight: 500;
}
.v-btn {
  color: #71b663;
}
</style>
