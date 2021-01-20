<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Domain Activation</div>
    </page-title>
    <purchase-form slot="page-content"></purchase-form>
  </page-layout>
</template>

<script>
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import PurchaseForm from "../components/domain/PurchaseForm.vue";
export default {
  components: {
    PurchaseForm,
    PageTitle,
    PageLayout
  }
};
</script>
