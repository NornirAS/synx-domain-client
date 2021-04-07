<template>
  <v-card>
    <div class="title">Enter domain name</div>
    <domain-form class="mb-4"></domain-form>
    <v-btn @click="backToDomains" class="text-capitalize" color="primary" text>
      Back
    </v-btn>
    <v-btn
      form="domain-form"
      type="submit"
      class="text-capitalize"
      color="info"
      rounded
      small
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
    ...mapState("alarmModule", ["createDomainSuccess"])
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
