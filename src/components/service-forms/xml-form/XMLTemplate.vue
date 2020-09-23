<template>
  <v-card outlined>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <v-row>
      <v-col md="6">
        <v-text-field
          label="Schema"
          single-line
          dense
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-btn :color="colorBlue" depressed rounded medium dark>
          <v-icon>{{ mdiPlus }}</v-icon>
          Add Schema
        </v-btn>
      </v-col>
    </v-row>
    <TableForXML />
  </v-card>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import TableForXML from "./TableForXML.vue";
export default {
  data() {
    return {
      mdiPlus,
      colorBlue: "#27AAE1"
    };
  },
  props: ["title", "description"],
  components: {
    TableForXML
  }
};
</script>
