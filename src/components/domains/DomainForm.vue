<template>
  <v-card>
    <v-form
      id="domain-form"
      ref="domainForm"
      v-model="valid"
      @submit.prevent="submitDomainForm"
      lazy-validation
    >
      <form-input-card>
        <div slot="title">Domain name</div>
        <div slot="subtitle">
          Add a unique domain name - the name will be part of the URI address.
        </div>
        <v-text-field
          v-model="domainName"
          :rules="domainRules"
          :counter="64"
          slot="action"
          label="Domain Name"
          prefix="https://"
          suffix=".cioty.com"
          outlined
          dense
        ></v-text-field>
      </form-input-card>
      <v-btn @click="backToDomains" color="primary" text>
        Back
      </v-btn>
      <v-btn
        class="float-right"
        form="domain-form"
        type="submit"
        color="primary"
      >
        Create
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import FormInputCard from "../globals/FormInputCard";
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
    },
    backToDomains() {
      this.$router.push({ name: "domains" });
    }
  },
  computed: {
    ...mapState("authentication", ["username", "token"]),
    ...mapState("alert", ["createDomainSuccess"])
  },
  watch: {
    createDomainSuccess() {
      this.$router.push({ name: "domains" });
    }
  },
  components: {
    FormInputCard
  }
};
</script>
