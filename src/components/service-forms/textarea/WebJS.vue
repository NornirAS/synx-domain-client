<template>
  <TextareaTemplate :title="title" :description="description" />
</template>

<script>
import TextareaTemplate from "./TextareaTemplate.vue";
export default {
  data() {
    return {
      title: "WebJS",
      description:
        "Optional. The WEBJS-feature allow you to push data to your clients when they connect to your service. All standard webcoding is supported such as javascript and html. Examples will be added."
    };
  },
  components: {
    TextareaTemplate
  }
};
</script>
