<template>
  <v-form
    id="service-form"
    ref="serviceForm"
    v-model="valid"
    @submit.prevent="submitServiceForm"
    lazy-validation
  >
    <service-name></service-name>
    <service-schema></service-schema>
    <service-inline-pre-script v-if="isValidLinks"></service-inline-pre-script>
    <service-inline-post-script
      v-if="isValidLinks"
    ></service-inline-post-script>
    <service-command></service-command>
    <service-web-js></service-web-js>
    <service-timeout></service-timeout>
  </v-form>
</template>

<script>
import ServiceName from "./ServiceName";
import ServiceSchema from "./ServiceSchema";
import ServiceInlinePreScript from "./ServiceInlinePreScript";
import ServiceInlinePostScript from "./ServiceInlinePostScript";
import ServiceCommand from "./ServiceCommand";
import ServiceWebJs from "./ServiceWebJs";
import ServiceTimeout from "./ServiceTimeout";
export default {
  data() {
    return {
      valid: false
    };
  },
  methods: {
    submitServiceForm() {
      const isFormValid = this.$refs.serviceForm.validate();
      if (isFormValid) {
        this.$store.commit("serviceFormModule/isServiceFormValid", isFormValid);
        console.log(this.domain);
        console.log(this.serviceName);
        console.log(this.serviceSchema);
        console.log(this.inlinePreScript);
        console.log(this.inlinePostScript);
        console.log(this.commandSchema);
        console.log(this.webJS);
        console.log(this.timeout);
      } else {
        console.log(isFormValid)
        this.$store.commit("serviceFormModule/isServiceFormValid", isFormValid);
      }
    }
  },
  computed: {
    domain() {
      return this.$store.state.serviceFormModule.domain;
    },
    serviceName() {
      return this.$store.state.serviceFormModule.name;
    },
    serviceSchema() {
      return this.$store.state.serviceFormModule.schema;
    },
    inlinePreScript() {
      return this.$store.state.serviceFormModule.inlinePreScript;
    },
    inlinePostScript() {
      return this.$store.state.serviceFormModule.inlinePostScript;
    },
    commandSchema() {
      return this.$store.state.serviceFormModule.command;
    },
    webJS() {
      return this.$store.state.serviceFormModule.webJS;
    },
    timeout() {
      return this.$store.state.serviceFormModule.timeout;
    },
    isValidLinks() {
      return this.$store.state.serviceFormModule.isValidLinks;
    }
  },
  components: {
    ServiceName,
    ServiceSchema,
    ServiceInlinePreScript,
    ServiceInlinePostScript,
    ServiceCommand,
    ServiceTimeout,
    ServiceWebJs
  }
};
</script>
