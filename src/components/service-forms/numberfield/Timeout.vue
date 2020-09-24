<template>
  <NumericTemplate
    :title="title"
    :description="description"
    :primaryValue="primaryValue"
    :secondaryValue="secondaryValue"
    :helper="helper"
    :primaryActionBtnName="primaryActionBtnName"
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
      primaryActionBtnName: "Set Timeout"
    };
  },
  components: {
    NumericTemplate
  }
};
</script>
