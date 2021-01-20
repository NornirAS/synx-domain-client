<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Create a Domain</div>
    </page-title>
    <domain-form slot="page-content"></domain-form>
  </page-layout>
</template>

<script>
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainForm from "../components/DomainForm";
export default {
  computed: {
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$router.push({ name: "domains" });
    }
  },
  components: {
    DomainForm,
    PageLayout,
    PageTitle
  }
};
</script>
