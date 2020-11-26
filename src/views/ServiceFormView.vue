<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>{{ title }}</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'services' }"
            :color="colorGrey"
            rounded
            small
            dark
          >
            <v-icon></v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col xs="12">
          <ServiceForm :btnName="btnName" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import ServiceForm from "../components/service-forms/ServiceForm.vue";
import ServiceForm from "../components/ServiceForm.vue";
export default {
  data() {
    return {
      title: "",
      btnName: "",
      colorGrey: "#404B5F"
    };
  },
  created() {
    if (this.index >= 0) {
      this.$store.commit("servicesModule/serviceIndex", this.index);
      this.$store.commit("serviceFormModule/editService", this.service);
      this.title = "Update Service";
      this.btnName = "Update";
    } else {
      this.title = "Create Service";
      this.btnName = "Create";
    }
  },
  beforeDestroy() {
    this.$store.commit("serviceFormModule/resetServiceForm");
  },
  computed: {
    service() {
      return this.$store.getters["servicesModule/serviceToEdit"];
    },
    index() {
      return this.$route.params.index;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$router.push({ name: "services" });
      this.$store.commit("serviceModule/resetServiceFormStatus");
    }
  },
  components: {
    ServiceForm
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
</style>
