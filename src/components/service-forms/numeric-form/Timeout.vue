<template>
  <NumericTemplate
    :title="title"
    :description="description"
    :primaryValue="primaryValue"
    :secondaryValue="secondaryValue"
    :helper="helper"
    :addButtonName="addButtonName"
  />
</template>

<script>
import NumericTemplate from "./NumericTemplate.vue";
export default {
  data() {
    return {
      title: "Timeout",
      description:
        "Time for inactive channelrequest before it closes(in seconds). Default 30.",
      primaryValue: "30",
      secondaryValue: "'s",
      helper: "Current Timeout",
      addButtonName: "Set Timeout"
    };
  },
  components: {
    NumericTemplate
  }
};
</script>
