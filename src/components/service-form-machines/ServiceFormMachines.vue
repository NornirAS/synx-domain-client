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
  </v-form>
</template>

<script>
import ServiceName from "./ServiceName";
import ServiceSchema from "./ServiceSchema";
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
    ServiceSchema
  }
};
</script>
