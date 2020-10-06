<template>
  <v-row justify="center">
    <v-col xs="12" md="10">
      <BasicForm />
    </v-col>
  </v-row>
</template>

<script>
import BasicForm from "../components/service-forms/BasicForm.vue";
export default {
  computed: {
    isCreated() {
      return this.$store.state.serviceCreated;
    },
    isError() {
      return this.$store.state.serviceRegistrationError;
    }
  },
  watch: {
    isCreated(newValue) {
      if (newValue) {
        this.$router.push({ name: "services" });
        this.$store.state.serviceCreated = false;
        if (this.isError !== null) {
          this.$store.state.serviceRegistrationError = null;
        }
      }
    },
    isError(newValue) {
      if (newValue) {
        console.log(newValue);
      }
    }
  },
  components: {
    BasicForm
  }
};
</script>
