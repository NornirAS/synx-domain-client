<template>
  <TextareaTemplate :title="title" :description="description" />
</template>

<script>
import TextareaTemplate from "./TextareaTemplate.vue";
export default {
  data() {
    return {
      title: "Service Description",
      description:
        "In order for the service to be found with Draape and used by others, agood description is recommended. What kind of data does the service provide?"
    };
  },
  components: {
    TextareaTemplate
  }
};
</script>
