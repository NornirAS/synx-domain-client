<template>
  <v-row justify="center">
    <v-col xs="12" md="10">
      <ServiceForm :title="title" :btnName="btnName" />
    </v-col>
  </v-row>
</template>

<script>
import ServiceForm from "../components/service-forms/ServiceForm.vue";
export default {
  data() {
    return {
      title: "",
      btnName: ""
    };
  },
  created() {
    if (this.index >= 0) {
      this.$store.commit("sidebarsModule/lightSideBarTitle", "Update Service");
      this.$store.commit("servicesModule/serviceIndex", this.index);
      this.$store.commit("serviceModule/editService", this.service);
      this.title = "Update Service";
      this.btnName = "Update";
    } else {
      this.$store.commit("sidebarsModule/lightSideBarTitle", "Create Service");
      this.title = "Create Service";
      this.btnName = "Create";
    }
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
    formSuccess() {
      return this.$store.state.serviceModule.formSuccess;
    }
  },
  watch: {
    formSuccess(newValue) {
      if (newValue) {
        this.$router.push({ name: "services" });
        this.$store.commit("serviceModule/resetServiceFormStatus");
      }
    }
  },
  components: {
    ServiceForm
  }
};
</script>
