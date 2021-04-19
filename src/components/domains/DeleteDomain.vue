<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="float-right text-capitalize"
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
      <div slot="body">
        Are you sure you want to delete domain
        <span class="font-weight-bold">{{ domainURI }}?</span>
      </div>
      <div slot="action">
        <v-btn
          @click="dialog = false"
          class="text-capitalize"
          color="primary"
          text
          small
          >Cancel</v-btn
        >
        <v-btn
          @click="deleteDomain"
          class="text-capitalize"
          color="info"
          rounded
          small
          >Confirm
        </v-btn>
      </div>
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
      dialog: false
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
