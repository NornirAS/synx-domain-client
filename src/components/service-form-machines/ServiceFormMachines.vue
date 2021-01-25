<template>
  <v-form
    id="service-form-machines"
    ref="serviceFormMachines"
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
  </v-form>
</template>

<script>
import ServiceName from "./ServiceName";
import ServiceSchema from "./ServiceSchema";
import ServiceInlinePreScript from "./ServiceInlinePreScript";
import ServiceInlinePostScript from "./ServiceInlinePostScript";
import ServiceCommand from "./ServiceCommand";
export default {
  data() {
    return {
      valid: false
    };
  },
  methods: {
    submitServiceForm() {
      console.log(this.$refs.serviceFormMachines.validate());
    }
  },
  computed: {
    isValidLinks() {
      return this.$store.state.serviceFormModule.isValidLinks;
    }
  },
  components: {
    ServiceName,
    ServiceSchema,
    ServiceInlinePreScript,
    ServiceInlinePostScript,
    ServiceCommand
  }
};
</script>
