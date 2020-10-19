<template>
  <form>
    <ServiceName />
    <ServiceDescription />
    <Keywords />
    <ServiceImage />
    <ServiceSchema />
    <CommandSchema />
    <Instances />
    <Timeout />
    <PreInlineScript />
    <PostInlineScript />
    <WebJS />
    <v-btn
      @click="submitForm"
      :color="colorBlue"
      style="float: right"
      rounded
      dark
      >{{ btnName }}</v-btn
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
import ServiceImage from "./textfield/ServiceImage";
export default {
  props: ["btnName"],
  data() {
    return {
      title: this.$store.state.sideBarTitle,
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    submitForm() {
      if (this.title === "Create Service") {
        this.$socket.emit(
          "register_service",
          this.domain,
          this.formData,
          this.username,
          this.token
        );
      } else {
        this.$store.state.serviceForm.instances = this.instancesBalance;
        this.$socket.emit(
          "update_service",
          this.domain,
          this.formData,
          this.token
        );
      }
      this.$store.dispatch("resetServiceForm");
    }
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
    formData() {
      return this.$store.state.serviceForm;
    },
    username() {
      return this.$store.state.username;
    },
    token() {
      return this.$store.state.idToken;
    },
    instancesBalance() {
      return this.$store.getters.instancesBalance;
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
    ServiceImage
  }
};
</script>
