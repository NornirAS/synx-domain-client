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
import MicropageTitle from "./MicropageTitle";
import ServiceDescription from "./ServiceDescription";
import SchemaDescription from "./SchemaDescription";
import ServiceKeywords from "./ServiceKeywords";
export default {
  data() {
    return {
      valid: false
    };
  },
  methods: {
    submitMicropageForm() {
      console.log(this.$refs.micropageForm.validate());
    }
  },
  computed: {},
  components: {
    MicropageTitle,
    ServiceDescription,
    SchemaDescription,
    ServiceKeywords
  }
};
</script>
