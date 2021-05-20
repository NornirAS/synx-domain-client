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
        <div slot="title">{{ title }}</div>
        <div slot="subtitle">
          Add a unique domain name - the name will be part of the URI address.
        </div>
        <v-text-field
          v-model="domainName"
          :rules="domainRules"
          :counter="maxLen"
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
import { requiredRule, lengthRule, urlPartRule } from "../../input-rules";
import FormInputCard from "../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Domain name",
      maxLen: 63,
      domainName: "",
      valid: false,
      domainRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen),
        v => urlPartRule(v, this.title)
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
