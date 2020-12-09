<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6">
      <PurchaseForm />
    </v-col>
  </v-row>
</template>

<script>
import PurchaseForm from "../components/domain/PurchaseForm.vue";
export default {
  components: {
    PurchaseForm
  }
};
</script>
