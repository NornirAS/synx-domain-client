<template>
  <NumericTemplate
    :title="title"
    :description="description"
    :availableInstances="availableInstances"
    :limitInstances="limitInstances"
  />
</template>

<script>
import NumericTemplate from "./NumericTemplate.vue";
export default {
  data() {
    return {
      title: "Instances",
      description: "Some description fro instances.",
      availableInstances: "100",
      limitInstances: "100"
    };
  },
  components: {
    NumericTemplate
  }
};
</script>
