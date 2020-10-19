<template>
  <v-row justify="center">
    <v-col xs="12" sm="10" md="8">
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
