<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="text-capitalize mt-4"
        color="secondary"
        rounded
        small
      >
        <v-icon left small>{{ mdiSwapHorizontal }}</v-icon>
        Transfer ownership
      </v-btn>
    </template>

    <dialog-card v-if="!transferComplete">
      <div slot="title">Transfer ownership</div>
      <div slot="body">
        <div class="body-1 mb-2">
          You transfering ownership of the ghost
          <span class="font-weight-bold">{{ ghostURI }}</span>
        </div>
        <v-form
          id="transfer-ownership"
          ref="transferOwnership"
          v-model="valid"
          @submit.prevent="submitForm"
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
      </div>
      <div slot="action">
        <v-btn
          @click="dialog = false"
          class="text-capitalize"
          color="secondary"
          text
          small
          >Cancel</v-btn
        >
        <v-btn
          class="text-capitalize"
          color="primary"
          type="submit"
          form="transfer-ownership"
          rounded
          small
          >Confirm transfer
        </v-btn>
      </div>
    </dialog-card>
    <dialog-card v-else>
      <div slot="title">Transfer has been initiated</div>
      <div slot="body">
        Before data can flow the new owner has to accept ownership.
      </div>
      <div slot="action">
        <v-btn
          @click="toGhosts"
          class="text-capitalize"
          color="primary"
          type="submit"
          form="transfer-ownership"
          rounded
          small
          >Let's rock!
        </v-btn>
      </div>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiSwapHorizontal } from "@mdi/js";
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
    username() {
      return this.$store.state.authModule.username;
    },
    tranferOwnershipSuccess() {
      return this.$store.state.alarmModule.tranferOwnershipSuccess;
    }
  },
  watch: {
    tranferOwnershipSuccess() {
      this.$store.commit("ghosts/resetGhosts");
      this.$socket.emit("get_owned_ghosts", this.token);
      this.$socket.emit("look_for_new_ghosts", {
        token: this.token,
        username: this.username
      });
    }
  },
  components: {
    DialogCard: () => import("../DialogCard")
  }
};
</script>
