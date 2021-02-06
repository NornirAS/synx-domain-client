<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="text-capitalize mt-4"
        color="primary"
        rounded
        outlined
        block
        small
      >
        Remove Ghost
        <v-icon small right>{{ mdiTrashCanOutline }}</v-icon>
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Remove Ghost</div>
      <div slot="body">
        Are you sure you want to remove ghost for
        <span class="font-weight-bold">{{ ghostURI }}?</span>
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
          @click="removeGhost"
          class="text-capitalize"
          color="primary"
          rounded
          small
          >Confirm Removal
        </v-btn>
      </div>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiTrashCanOutline } from "@mdi/js";
import DialogCard from "../DialogCard";
export default {
  props: ["token", "ghost", "ghostURI"],
  data() {
    return {
      mdiTrashCanOutline,
      dialog: false
    };
  },
  methods: {
    removeGhost() {
      this.$socket.emit("remove_ghost", {
        domain: this.ghost.domain,
        service: this.ghost.service,
        token: this.token,
        instance: this.ghost.instance
      });
      this.dialog = false;
      this.$router.push({ name: "ghosts" });
    }
  },
  components: {
    DialogCard
  }
};
</script>
