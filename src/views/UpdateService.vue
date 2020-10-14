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
  created() {
    this.$store.state.sideBarTitle = "Update Service";
  },
  components: {
    BasicForm
  }
};
</script>
