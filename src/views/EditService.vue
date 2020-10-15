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
      index: this.$route.params.index,
      btnName: "Update"
    };
  },
  created() {
    this.$store.state.sideBarTitle = "Edit Service";
    this.$store.dispatch("editService", this.index);
  },
  beforeDestroy() {
    this.$store.dispatch("resetServiceForm");
  },
  components: {
    BasicForm
  }
};
</script>
