<template>
  <SingleLineTemplate :title="title" :description="description" />
</template>

<script>
import SingleLineTemplate from "./SingleLineTemplate.vue";
export default {
  data() {
    return {
      title: "Keywords",
      description: "Search keywords to easily discover your service."
    };
  },
  components: {
    SingleLineTemplate
  }
};
</script>
