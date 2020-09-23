<template>
  <v-btn :color="colorBlue" depressed rounded medium dark>
    <v-icon>{{ mdiPlus }}</v-icon>
    {{ addButtonName }}
  </v-btn>
</template>

<script>
import { mdiPlus } from "@mdi/js";
export default {
  props: ["addButtonName"],
  data() {
    return {
      mdiPlus,
      colorBlue: "#27AAE1"
    };
  }
};
</script>
