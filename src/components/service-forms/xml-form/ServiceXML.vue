<template>
  <XMLTemplate :title="title" :description="description" />
</template>

<script>
import XMLTemplate from "./XMLTemplate.vue";
export default {
  data() {
    return {
      title: "Service XML",
      description:
        "This is the message format or API for this service. Put XML on a single line to make it easier to parse on the client. You may link to variables in other services by using @domain/servicename#variable@ notation. Include links in link section below."
    };
  },
  components: {
    XMLTemplate
  }
};
</script>
