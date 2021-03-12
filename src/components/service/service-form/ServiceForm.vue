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
        color="info"
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
import { mapState } from "vuex";
import ServiceDomain from "./ServiceDomain";
import ServiceName from "./ServiceName";
import ServiceDescription from "./ServiceDescription";
import ServiceKeywords from "./ServiceKeywords";
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
      if (isFormValid && this.isServiceUpdate) {
        this.$socket.emit("update_service", {
          token: this.token,
          domain: this.domain,
          service: this.name,
          description: this.description,
          keywords: this.keywords,
          schema: this.schema,
          inlinePreScript: this.inlinePreScript,
          inlinePostScript: this.inlinePostScript,
          command: this.command,
          webJS: this.webJS,
          timeout: this.timeout
        });
      } else if (isFormValid) {
        this.$socket.emit("register_service", {
          token: this.token,
          username: this.username,
          domain: this.domain,
          service: this.name,
          description: this.description,
          keywords: this.keywords,
          schema: this.schema,
          inlinePreScript: this.inlinePreScript,
          inlinePostScript: this.inlinePostScript,
          command: this.command,
          webJS: this.webJS,
          timeout: this.timeout
        });
      }
    },
    backToServices() {
      this.$router.push({ name: "services" });
    }
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    ...mapState("serviceFormModule", [
      "domain",
      "name",
      "description",
      "keywords",
      "schema",
      "inlinePreScript",
      "inlinePostScript",
      "command",
      "webJS",
      "timeout",
      "isValidLinks"
    ]),
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    }
  },
  components: {
    ServiceDomain,
    ServiceName,
    ServiceDescription,
    ServiceKeywords,
    ServiceSchema,
    ServiceInlinePreScript,
    ServiceInlinePostScript,
    ServiceCommand,
    ServiceWebJs,
    ServiceTimeout
  }
};
</script>
