<template>
  <v-form
    id="domain-form"
    ref="domainForm"
    v-model="valid"
    @submit.prevent="submitDomainForm"
    lazy-validation
  >
    <v-text-field
      v-model="domainName"
      :rules="domainRules"
      :counter="64"
      label="Domain Name"
      prefix="https://"
      suffix=".cioty.com"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      domainName: "",
      valid: false,
      domainRules: [
        v => (v && v.length) >= 1 || "Domain Name is required",
        v =>
          (v && v.length) <= 64 || "Domain Name must be maximum 64 characters",
        v => /^[A-Za-z]+$/.test(v) || "Only alphabet characters are allowed"
      ]
    };
  },
  methods: {
    ...mapMutations("stripeModule", ["addDomain"]),
    submitDomainForm() {
      const isValid = this.$refs.domainForm.validate();
      if (isValid) {
        this.$socket.emit("create_domain", {
          token: this.token,
          username: this.username,
          domain: this.domainName,
          feature: "add"
        });
      }
    }
  },
  computed: {
    ...mapState("authModule", ["username", "token"]),
    ...mapState("alarmModule", ["createDomainSuccess"])
  },
  watch: {
    createDomainSuccess() {
      this.addDomain(this.domainName);
    }
  }
};
</script>
