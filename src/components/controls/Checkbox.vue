<template>
  <v-checkbox :style="customStyle"></v-checkbox>
</template>

<script>
export default {
  props: ["customStyle"]
};
</script>

<style scoped>
.v-input--selection-controls {
  margin: 0;
  padding-top: 0.5em;
}
</style>
