<template>
  <SingleLineTemplate :title="title" :description="description" />
</template>

<script>
import SingleLineTemplate from "./SingleLineTemplate.vue";
export default {
  data() {
    return {
      title: "Image",
      description: "Optional. URL to an image for your service."
    };
  },
  components: {
    SingleLineTemplate
  }
};
</script>
