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
  data() {
    return {
      index: this.$route.params.index
    };
  },
  created() {
    this.$store.state.sideBarTitle = "Edit Service";
    this.$store.dispatch("editService", this.index);
  },
  components: {
    BasicForm
  }
};
</script>
