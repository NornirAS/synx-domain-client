<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="float-right"
        color="error"
        small
        text
      >
        Delete
        <v-icon small>{{ mdiTrashCanOutline }}</v-icon>
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Delete Domain</div>
      <v-alert slot="text" prominent text type="error">
        Are you sure you want to delete domain
        <span class="font-weight-bold">{{ domainURI }}?</span>
      </v-alert>
      <v-switch
        slot="input"
        class="mt-0 pt-0"
        v-model="deleteApprove"
        :label="deleteApprove === true ? 'Yes' : 'No'"
        inset
      ></v-switch>
      <v-btn slot="cancel-btn" @click="cancel()" color="primary" text small
        >Cancel</v-btn
      >
      <v-btn
        slot="confirm-btn"
        @click="deleteDomain"
        :disabled="!deleteApprove"
        color="primary"
        small
        >Confirm
      </v-btn>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiTrashCanOutline } from "@mdi/js";
import { rootDomain } from "../../core/config";
import DialogCard from "../globals/DialogCard";
export default {
  props: ["token", "username", "domain"],
  data() {
    return {
      mdiTrashCanOutline,
      rootDomain,
      dialog: false,
      deleteApprove: false
    };
  },
  methods: {
    deleteDomain() {
      this.$socket.emit("delete_domain", {
        token: this.token,
        username: this.username,
        domain: this.domain,
        feature: "remove"
      });
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
      this.deleteApprove = false;
    }
  },
  computed: {
    domainURI() {
      return `${this.domain}${this.rootDomain}`;
    }
  },
  components: {
    DialogCard
  }
};
</script>
