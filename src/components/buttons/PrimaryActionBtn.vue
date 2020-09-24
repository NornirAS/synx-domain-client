<template>
  <v-btn :color="colorBlue" depressed rounded medium dark :to="path">
    <v-icon>{{ mdiPlus }}</v-icon>
    {{ primaryActionBtnName }}
  </v-btn>
</template>

<script>
import { mdiPlus } from "@mdi/js";
export default {
  props: ["primaryActionBtnName", "path"],
  data() {
    return {
      mdiPlus,
      colorBlue: "#27AAE1"
    };
  }
};
</script>
