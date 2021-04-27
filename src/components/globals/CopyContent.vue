<template>
  <v-btn @click="copy(content)" color="primary" :disabled="copied" icon>
    <v-icon class="align-center">{{
      copied ? mdiCheck : mdiContentCopy
    }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiContentCopy, mdiCheck } from "@mdi/js";
export default {
  props: ["content"],
  data() {
    return {
      mdiContentCopy,
      mdiCheck,
      copied: false
    };
  },
  methods: {
    copy(content) {
      navigator.clipboard.writeText(content);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 5000);
    }
  }
};
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled .v-icon {
  color: var(--v-accent-base) !important;
}
</style>
