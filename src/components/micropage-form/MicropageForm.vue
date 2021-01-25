<template>
  <v-form
    id="micropage-form"
    ref="micropageForm"
    v-model="valid"
    @submit.prevent="submitMicropageForm"
    lazy-validation
  >
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
      console.log(this.$refs.micropageForm.validate());
    }
  },
  computed: {},
  components: {}
};
</script>
