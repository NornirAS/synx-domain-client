<template>
  <TextareaTemplate :title="title" :description="description" />
</template>

<script>
import TextareaTemplate from "./TextareaTemplate.vue";
export default {
  data() {
    return {
      title: "Service Pre MasterScript",
      description:
        "Optional. The masterscript allow you to transform your data both by using JavaScript but also by including. Examples will be added."
    };
  },
  components: {
    TextareaTemplate
  }
};
</script>
