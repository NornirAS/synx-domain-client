<template>
  <SchemaTemplate
    :title="title"
    :description="description"
    :isSchema="isCommandSchema"
  />
</template>

<script>
import SchemaTemplate from "./SchemaTemplate.vue";
export default {
  data() {
    return {
      title: "Command Schema",
      description:
        "This is the message format or API for this service command XML. Put XML on a single line to make it easier to parse on the client. You may link to variables in other services by using @domain/servicename#variable@ notation. Include links in link section below."
    };
  },
  components: {
    SchemaTemplate
  },
  computed: {
    isCommandSchema() {
      return this.$store.getters["serviceModule/isCommandSchema"];
    }
  }
};
</script>
