<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Create a Domain</div>
    </page-title>
    <domain-form slot="page-content"></domain-form>
  </page-layout>
</template>

<script>
import { mapState } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainForm from "../components/DomainForm";
export default {
  computed: {
    ...mapState("authModule", ["username", "token"]),
    ...mapState("alarmModule", ["createDomainSuccess"])
  },
  watch: {
    createDomainSuccess() {
      this.$router.push({ name: "domains" });
      this.$socket.emit("get_all_domains", {
        token: this.token,
        username: this.username
      });
    }
  },
  components: {
    DomainForm,
    PageLayout,
    PageTitle
  }
};
</script>
