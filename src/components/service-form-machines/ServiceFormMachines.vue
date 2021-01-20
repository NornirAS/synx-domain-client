<template>
  <v-form
    id="service-form-machines"
    ref="serviceFormMachines"
    v-model="valid"
    @submit.prevent="submitServiceForm"
    lazy-validation
  >
    <service-name></service-name>
  </v-form>
</template>

<script>
import ServiceName from "./ServiceName";
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
    ServiceName
  }
};
</script>
