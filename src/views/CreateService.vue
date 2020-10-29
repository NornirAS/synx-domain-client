<template>
  <v-row justify="center">
    <v-col xs="12" md="10">
      <ServiceForm :btnName="btnName" />
    </v-col>
  </v-row>
</template>

<script>
import ServiceForm from "../components/service-forms/ServiceForm.vue";
export default {
  data() {
    return {
      btnName: "Create"
    };
  },
  created() {
    this.$store.state.sideBarTitle = "Create Service";
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    formSuccess() {
      return this.serviceModule.formSuccess;
    },
    formError() {
      return this.serviceModule.formError;
    }
  },
  watch: {
    formSuccess(newValue) {
      if (newValue) {
        this.$router.push({ name: "services" });
        this.$store.commit("serviceModule/resetServiceFormStatus");
      }
    },
    formError(newValue) {
      if (newValue) {
        console.log(newValue);
      }
    }
  },
  components: {
    ServiceForm
  }
};
</script>
