<template>
  <form>
    <ServiceName />
    <ServiceDescription />
    <ServiceKeywords />
    <ServiceImage />
    <ServiceSchema />
    <CommandSchema />
    <ServiceInstances />
    <ServiceTimeout />
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
import ServiceKeywords from "./textfield/ServiceKeywords.vue";
import ServiceSchema from "./xml/ServiceSchema.vue";
import CommandSchema from "./xml/CommandSchema.vue";
import ServiceInstances from "./numberfield/ServiceInstances.vue";
import ServiceTimeout from "./numberfield/ServiceTimeout.vue";
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
        this.serviceModule.serviceForm.instances - 1; // -1 because RTW add 1 instance by default
        this.$socket.emit(
          "register_service",
          this.domain,
          this.formData,
          this.username,
          this.token
        );
      } else {
        this.serviceModule.serviceForm.instances = this.instancesBalance;
        this.$socket.emit(
          "update_service",
          this.domain,
          this.formData,
          this.token
        );
      }
      this.$store.dispatch("serviceModule/resetServiceForm");
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    formData() {
      return this.serviceModule.serviceForm;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    instancesBalance() {
      return this.$store.getters["serviceModule/instancesBalance"];
    }
  },
  components: {
    ServiceName,
    ServiceDescription,
    ServiceKeywords,
    ServiceSchema,
    CommandSchema,
    ServiceInstances,
    ServiceTimeout,
    WebJS,
    PostInlineScript,
    PreInlineScript,
    ServiceImage
  }
};
</script>
