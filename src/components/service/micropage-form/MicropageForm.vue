<template>
  <v-form
    id="micropage-form"
    ref="micropageForm"
    v-model="valid"
    @submit.prevent="submitMicropageForm"
    lazy-validation
  >
    <!-- <micropage-title></micropage-title> -->
    <service-image></service-image>
    <service-description></service-description>
    <schema-description></schema-description>
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
    submitMicropageForm() {
      const isFormValid = this.$refs.micropageForm.validate();
      this.$store.commit(
        "micropageFormModule/isMicropageFormValid",
        isFormValid
      );
    }
  },
  components: {
    // MicropageTitle: () => import("./MicropageTitle"),
    ServiceImage: () => import("./ServiceImage"),
    ServiceDescription: () => import("./ServiceDescription"),
    SchemaDescription: () => import("./SchemaDescription")
  }
};
</script>
