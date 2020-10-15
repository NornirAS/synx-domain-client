<template>
  <v-row justify="center">
    <v-col xs="12" md="10">
      <BasicForm :btnName="btnName" />
    </v-col>
  </v-row>
</template>

<script>
import BasicForm from "../components/service-forms/BasicForm.vue";
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
    isCreated() {
      return this.$store.state.formSubmited;
    },
    isError() {
      return this.$store.state.formError;
    }
  },
  watch: {
    isCreated(newValue) {
      if (newValue) {
        this.$router.push({ name: "services" });
        this.$store.state.formSubmited = false;
        if (this.isError !== null) {
          this.$store.state.formError = null;
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
