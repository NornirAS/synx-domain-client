<template>
  <h2>
    {{ title }}
    <v-icon :color="color">{{ mdiInformationOutline }}</v-icon>
  </h2>
</template>

<script>
import { mdiInformationOutline } from "@mdi/js";
export default {
  props: ["title", "color"],
  data() {
    return {
      mdiInformationOutline
    };
  }
};
</script>
