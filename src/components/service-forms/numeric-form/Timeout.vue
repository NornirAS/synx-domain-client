<template>
  <NumericTemplate
    :title="title"
    :description="description"
    :primaryValue="primaryValue"
    :secondaryValue="secondaryValue"
    :helper="helper"
  />
</template>

<script>
import NumericTemplate from "./NumericTemplate.vue";
export default {
  data() {
    return {
      title: "Instances",
      description: "Some description fro instances.",
      primaryValue: "30",
      secondaryValue: "'s",
      helper: "Current Timeout"
    };
  },
  components: {
    NumericTemplate
  }
};
</script>
