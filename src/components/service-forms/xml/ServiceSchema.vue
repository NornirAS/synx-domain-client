<template>
  <SchemaTemplate
    :title="title"
    :description="description"
    :isSchema="isServiceSchema"
  />
</template>

<script>
import SchemaTemplate from "./SchemaTemplate.vue";
export default {
  data() {
    return {
      title: "Service Schema",
      description:
        "This is the message format or API for this service. Put Schema on a single line to make it easier to parse on the client. You may link to variables in other services by using @domain/servicename#variable@ notation. Include links in link section below."
    };
  },
  components: {
    SchemaTemplate
  },
  computed: {
    isServiceSchema() {
      return this.$store.state.serviceForm.serviceSchema.length > 0;
    }
  }
};
</script>
