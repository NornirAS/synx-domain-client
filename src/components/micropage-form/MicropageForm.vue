<template>
  <v-form
    id="micropage-form"
    ref="micropageForm"
    v-model="valid"
    @submit.prevent="submitMicropageForm"
    lazy-validation
  >
    <micropage-title></micropage-title>
    <service-description></service-description>
    <schema-description></schema-description>
    <service-keywords></service-keywords>
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
      this.$store.commit("serviceFormModule/isMicropageFormValid", isFormValid);
    }
  },
  components: {
    MicropageTitle: () => import("./MicropageTitle"),
    ServiceDescription: () => import("./ServiceDescription"),
    SchemaDescription: () => import("./SchemaDescription"),
    ServiceKeywords: () => import("./ServiceKeywords")
  }
};
</script>
