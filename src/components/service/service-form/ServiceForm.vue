<template>
  <v-form
    id="service-form"
    ref="serviceForm"
    v-model="valid"
    @submit.prevent="submitServiceForm"
    lazy-validation
  >
    <div class="title">Service Settings - for Machines</div>
    <service-domain v-if="!isServiceUpdate"></service-domain>
    <service-name></service-name>
    <service-description></service-description>
    <service-keywords></service-keywords>
    <service-schema></service-schema>
    <service-inline-pre-script v-if="isValidLinks"></service-inline-pre-script>
    <service-inline-post-script
      v-if="isValidLinks"
    ></service-inline-post-script>
    <service-command></service-command>
    <service-web-js></service-web-js>
    <service-timeout></service-timeout>
    <div>
      <v-btn
        @click="backToServices"
        class="text-capitalize"
        color="secondary"
        text
      >
        Cancel
      </v-btn>
      <v-btn
        class="text-capitalize"
        color="primary"
        type="submit"
        form="service-form"
        small
        rounded
      >
        Save
      </v-btn>
    </div>
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
      if (isFormValid && this.isServiceUpdate) {
        this.$socket.emit("update_service", this.updateServiceParams);
      } else if (isFormValid) {
        this.$socket.emit("register_service", this.registerServiceParams);
      }
    },
    backToServices() {
      this.$router.push({ name: "services" });
    }
  },
  computed: {
    isValidLinks() {
      return this.$store.state.serviceFormModule.isValidLinks;
    },
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    registerServiceParams() {
      return this.$store.getters["serviceFormModule/registerServiceParams"];
    },
    updateServiceParams() {
      return this.$store.getters["serviceFormModule/updateServiceParams"];
    }
  },
  components: {
    ServiceDomain: () => import("./ServiceDomain"),
    ServiceName: () => import("./ServiceName"),
    ServiceDescription: () => import("./ServiceDescription"),
    ServiceKeywords: () => import("./ServiceKeywords"),
    ServiceSchema: () => import("./ServiceSchema"),
    ServiceInlinePreScript: () => import("./ServiceInlinePreScript"),
    ServiceInlinePostScript: () => import("./ServiceInlinePostScript"),
    ServiceCommand: () => import("./ServiceCommand"),
    ServiceWebJs: () => import("./ServiceWebJs"),
    ServiceTimeout: () => import("./ServiceTimeout")
  }
};
</script>
