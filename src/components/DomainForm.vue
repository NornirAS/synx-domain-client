<template>
  <v-form
    id="domain-form"
    ref="domainForm"
    v-model="domainValid"
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
          :counter="16"
          slot="action"
          label="Domain Name"
          prefix="https://"
          suffix=".cioty.com"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-btn
      :style="actionBtnStyle"
      class="text-capitalize"
      type="submit"
      rounded
      dark
    >
      Create
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      domainName: "",
      domainValid: false,
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right",
        marginTop: "20px"
      },
      domainRules: [
        v => (v && v.length) >= 1 || "Domain Name is required",
        v => (v && v.length) <= 16 || "You can add maximum 16 keywords",
        v => /^[A-Za-z]+$/.test(v) || "Only alphabet characters are allowed"
      ]
    };
  },
  methods: {
    submitDomainForm() {
      this.$refs.domainForm.validate();
      if (this.$refs.domainForm.validate()) {
        this.$socket.emit(
          "create_domain",
          this.token,
          this.username,
          this.domainName
        );
      }
    }
  },
  computed: {
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.idToken;
    }
  }
};
</script>
