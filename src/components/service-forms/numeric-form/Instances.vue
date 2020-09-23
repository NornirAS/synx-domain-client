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
      primaryValue: "100",
      secondaryValue: "/100",
      helper: "Available Instances"
    };
  },
  components: {
    NumericTemplate
  }
};
</script>
