<template>
  <div>
    <SingleLineTemplate :title="title" :description="description" />
  </div>
</template>

<script>
import SingleLineTemplate from "./SingleLineTemplate.vue";
export default {
  data() {
    return {
      title: "Service Name",
      description: "Typically what the service/object do."
    };
  },
  components: {
    SingleLineTemplate
  }
};
</script>
