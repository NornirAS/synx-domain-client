<template>
  <form>
    <ServiceName />
    <ServiceDescription />
    <Keywords />
    <ServiceSchema />
    <CommandSchema />
    <Instances />
    <Timeout />
    <WebJS />
    <PostInlineScript />
    <PreInlineScript />
    <ServiceImage />
    <Micropage />
    <v-btn
      @click="submitForm"
      :color="colorBlue"
      style="float: right"
      rounded
      dark
      >Submit</v-btn
    >
  </form>
</template>

<script>
import ServiceName from "./textfield/ServiceName.vue";
import ServiceDescription from "./textarea/ServiceDescription.vue";
import Keywords from "./textfield/Keywords.vue";
import ServiceSchema from "./xml/ServiceSchema.vue";
import CommandSchema from "./xml/CommandSchema.vue";
import Instances from "./numberfield/Instances.vue";
import Timeout from "./numberfield/Timeout.vue";
import WebJS from "./textarea/WebJS.vue";
import PostInlineScript from "./textarea/PostInlineScript.vue";
import PreInlineScript from "./textarea/PreInlineScript.vue";
import Micropage from "./Micropage.vue";
import ServiceImage from "./textfield/ServiceImage";
export default {
  data() {
    return {
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    submitForm() {
      this.$socket.emit(
        "register-service",
        this.formData,
        this.username,
        this.token
      );
      this.$store.state.serviceForm = {
        serviceName: null,
        description: null,
        keywords: [],
        serviceSchema: [],
        commandSchema: [],
        instances: null,
        timeOut: "30"
      };
    }
  },
  computed: {
    formData() {
      return this.$store.state.serviceForm;
    },
    username() {
      return this.$store.state.username;
    },
    token() {
      return this.$store.state.idToken;
    }
  },
  components: {
    ServiceName,
    ServiceDescription,
    Keywords,
    ServiceSchema,
    CommandSchema,
    Instances,
    Timeout,
    WebJS,
    PostInlineScript,
    PreInlineScript,
    Micropage,
    ServiceImage
  }
};
</script>
