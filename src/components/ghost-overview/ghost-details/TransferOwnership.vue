<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" small>
        <v-icon>{{ mdiSwapHorizontal }}</v-icon>
      </v-btn>
    </template>

    <dialog-card v-if="!transferComplete">
      <div slot="title">Transfer ownership</div>
      <div slot="text" class="body-1">
        You transfering ownership of the ghost
        <span class="font-weight-bold">{{ ghostURI }}</span>
      </div>
      <v-form
        id="transfer-ownership"
        ref="transferOwnership"
        v-model="valid"
        @submit.prevent="submitForm"
        slot="input"
        lazy-validation
      >
        <v-text-field
          v-model="newOwnerUsername"
          :rules="usernameRules"
          label="E-mail of new owner"
          type="text"
          outlined
          dense
        ></v-text-field>
      </v-form>
      <v-btn
        slot="cancel-btn"
        @click="dialog = false"
        color="primary"
        text
        small
        >Cancel</v-btn
      >
      <v-btn
        slot="confirm-btn"
        color="primary"
        type="submit"
        form="transfer-ownership"
        small
        >Confirm
      </v-btn>
    </dialog-card>
    <dialog-card v-else>
      <div slot="title">Transfer has been initiated</div>
      <div slot="text">
        Before data can flow the new owner has to accept ownership.
      </div>
      <v-btn
        slot="confirm-btn"
        @click="toGhosts"
        color="primary"
        type="submit"
        form="transfer-ownership"
        small
        >Let's rock!
      </v-btn>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiSwapHorizontal } from "@mdi/js";
import { mapState } from "vuex";
import DialogCard from "../../globals/DialogCard";
export default {
  props: ["token", "ghost", "ghostURI"],
  data() {
    return {
      mdiSwapHorizontal,
      newOwnerUsername: "",
      valid: false,
      usernameRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      dialog: false,
      transferComplete: false
    };
  },
  methods: {
    submitForm() {
      const isFormValid = this.$refs.transferOwnership.validate();
      if (isFormValid) {
        this.$socket.emit("transfer_ownership", {
          domain: this.ghost.domain,
          service: this.ghost.service,
          token: this.token,
          username: this.username,
          instance: this.ghost.instance,
          newOwnerUsername: this.newOwnerUsername
        });
        this.transferComplete = true;
      }
    },
    toGhosts() {
      this.$router.push({ name: "ghosts" });
      this.dialog = false;
      this.transferComplete = false;
    }
  },
  computed: {
    ...mapState("authentication", ["username"])
  },
  components: {
    DialogCard
  }
};
</script>
