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
export default {
  data() {
    return {
      valid: false
    };
  },
  methods: {
    submitServiceForm() {
      const isFormValid = this.$refs.serviceForm.validate();
      this.$store.commit("serviceFormModule/isServiceFormValid", isFormValid);
    }
  },
  computed: {
    isValidLinks() {
      return this.$store.state.serviceFormModule.isValidLinks;
    }
  },
  components: {
    ServiceName: () => import("./ServiceName"),
    ServiceSchema: () => import("./ServiceSchema"),
    ServiceInlinePreScript: () => import("./ServiceInlinePreScript"),
    ServiceInlinePostScript: () => import("./ServiceInlinePostScript"),
    ServiceCommand: () => import("./ServiceCommand"),
    ServiceTimeout: () => import("./ServiceWebJs"),
    ServiceWebJs: () => import("./ServiceTimeout")
  }
};
</script>
