<template>
  <v-card>
    <div class="title">Enter domain name</div>
    <domain-form class="mb-4"></domain-form>
    <v-btn @click="backToDomains" color="primary" text>
      Back
    </v-btn>
    <v-btn
      style="float: right"
      form="domain-form"
      type="submit"
      color="primary"
    >
      Create
    </v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import DomainForm from "./DomainForm";
export default {
  methods: {
    backToDomains() {
      this.$router.push({ name: "domains" });
    }
  },
  computed: {
    ...mapState("authentication", ["token", "username"]),
    ...mapState("alert", ["createDomainSuccess"])
  },
  watch: {
    createDomainSuccess() {
      this.$router.push({ name: "domains" });
    }
  },
  components: {
    DomainForm
  }
};
</script>
