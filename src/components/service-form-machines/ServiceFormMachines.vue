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
    <service-inline-pre-script></service-inline-pre-script>
    <service-inline-post-script></service-inline-post-script>
  </v-form>
</template>

<script>
import ServiceName from "./ServiceName";
import ServiceSchema from "./ServiceSchema";
import ServiceInlinePreScript from "./ServiceInlinePreScript";
import ServiceInlinePostScript from "./ServiceInlinePostScript";
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
  components: {
    ServiceName,
    ServiceSchema,
    ServiceInlinePreScript,
    ServiceInlinePostScript
  }
};
</script>
