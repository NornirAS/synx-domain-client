<template>
  <XMLTemplate
    :title="title"
    :description="description"
    :isSchema="ifCommandXML"
  />
</template>

<script>
import XMLTemplate from "./XMLTemplate.vue";
export default {
  data() {
    return {
      title: "Command XML",
      description:
        "This is the message format or API for this service command XML. Put XML on a single line to make it easier to parse on the client. You may link to variables in other services by using @domain/servicename#variable@ notation. Include links in link section below."
    };
  },
  components: {
    XMLTemplate
  },
  computed: {
    ifCommandXML() {
      return this.$store.state.serviceForm.commandXML.length > 0;
    }
  }
};
</script>
