<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-switch inset :color="colorBlue"></v-switch>
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-text-field
          dense
          hide-details
          label="URL"
          placeholder="https://domain.cioty.com/service"
          value="https://domain.cioty.com/service"
          outlined
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-btn :color="colorBlue" rounded outlined>Copy Link</v-btn>
        <v-btn :color="colorBlue" rounded outlined>Visit Micropage</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Favicon_250x250.png"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormHeader from "./FormHeader.vue";
export default {
  data() {
    return {
      title: "Micropage",
      description:
        "Micropage is a webpage you create for a service to be able to be found by others on Draape",
      colorBlue: "#27AAE1"
    };
  },
  components: {
    FormHeader
  }
};
</script>

<style>
.v-btn {
  margin-right: 10px;
}
</style>
