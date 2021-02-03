<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-capitalize"
        color="primary"
        v-bind="attrs"
        v-on="on"
        text
      >
        <v-icon small>{{ mdiPlus }}</v-icon>
        Add receiver
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Give read access</div>
      <div slot="body">
        <v-form
          id="read-access"
          ref="readAccess"
          v-model="valid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Email of other user"
            required
            outlined
            dense
          ></v-text-field>
        </v-form>
      </div>
      <div slot="action">
        <v-btn
          @click="dialog = false"
          class="text-capitalize"
          color="secondary"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          type="submit"
          form="read-access"
          class="text-capitalize"
          color="primary"
          rounded
          small
        >
          I accept
        </v-btn>
      </div>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import DialogCard from "../DialogCard";
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
      ],
      dialog: false
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
        this.dialog = false;
      }
    }
  },
  components: {
    DialogCard
  }
};
</script>
