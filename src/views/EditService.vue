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
      btnName: "Update"
    };
  },
  created() {
    this.$store.state.sideBarTitle = "Edit Service";
    this.$store.commit("servicesModule/serviceIndex", this.index);
    this.$store.commit("serviceModule/editService", this.service);
  },
  beforeDestroy() {
    this.$store.commit("serviceModule/resetServiceForm");
  },
  computed: {
    service() {
      return this.$store.getters["servicesModule/serviceToEdit"];
    },
    index() {
      return this.$route.params.index;
    },
    isCreated() {
      return this.$store.state.serviceModule.formSuccess;
    },
    isError() {
      return this.$store.state.serviceModule.formError;
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
