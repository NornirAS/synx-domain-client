<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">My Account</div>
    </page-title>
    <account-details slot="page-content"></account-details>
  </page-layout>
</template>

<script>
import PageTitle from "../components/globals/PageTitle";
import PageLayout from "../components/globals/PageLayout";
import AccountDetails from "../components/account/AccountDetails";
export default {
  components: {
    PageTitle,
    PageLayout,
    AccountDetails
  }
};
</script>
