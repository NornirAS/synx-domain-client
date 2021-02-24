<template>
  <v-form
    id="domain-form"
    ref="domainForm"
    v-model="valid"
    @submit.prevent="submitDomainForm"
    lazy-validation
  >
    <v-card>
      <v-card-title>
        Choose name for you domain
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="domainName"
          :rules="domainRules"
          :counter="64"
          label="Domain Name"
          prefix="https://"
          suffix=".cioty.com"
        ></v-text-field>
        <p v-if="error" align="center">{{ error }}</p>
      </v-card-text>
    </v-card>
    <div align="end">
      <v-btn
        align="end"
        color="primary"
        class="text-capitalize"
        type="submit"
        small
        rounded
      >
        Create
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      domainName: "",
      error: "",
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
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.token;
    },
    errorMessage() {
      return this.$store.state.alarmModule.errorMessage;
    }
  },
  watch: {
    errorMessage(newValue) {
      this.error = newValue;
    },
    domainName() {
      this.error = "";
      this.$store.commit("alarmModule/resetErrorMessage");
    }
  }
};
</script>
