<template>
  <v-form
    id="read-access"
    ref="readAccess"
    v-model="valid"
    @submit.prevent="submitForm"
    lazy-validation
    class="d-flex justify-start"
  >
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      outlined
      label="E-mail"
      type="text"
      dense
    >
    </v-text-field>
    <v-btn class="text-capitalize ml-4" color="primary" type="submit">
      <v-icon>{{ mdiPlus }}</v-icon>
      Add receiver
    </v-btn>
  </v-form>
</template>

<script>
import { mdiPlus } from "@mdi/js";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiPlus,
      username: "",
      valid: false,
      usernameRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    submitForm() {
      const isFormValid = this.$refs.readAccess.validate();
      if (isFormValid) {
        this.$socket.emit("give_read_access", {
          domain: this.ghost.domain,
          service: this.ghost.service,
          token: this.token,
          username: this.username,
          instance: this.ghost.instance
        });
      }
    }
  }
};
</script>
