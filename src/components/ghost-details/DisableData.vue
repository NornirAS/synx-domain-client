<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" small>
        <v-icon>{{ mdiSkullCrossbones }}</v-icon>
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Disable Data</div>
      <div slot="text">
        Are you sure you want to disable data to
        <span class="font-weight-bold">{{ ghostURI }}?</span>
      </div>
      <v-btn
        slot="cancel-btn"
        @click="dialog = false"
        color="primary"
        text
        small
        >Cancel</v-btn
      >
      <v-btn slot="confirm-btn" @click="killSession" color="primary" small
        >Confirm
      </v-btn>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiSkullCrossbones } from "@mdi/js";
import DialogCard from "../globals/DialogCard";
export default {
  props: ["token", "ghost", "ghostURI"],
  data() {
    return {
      mdiSkullCrossbones,
      dialog: false
    };
  },
  methods: {
    killSession() {
      this.$socket.emit("kill_session", {
        domain: this.ghost.domain,
        service: this.ghost.service,
        token: this.token,
        instance: this.ghost.instance
      });
      this.dialog = false;
    }
  },
  components: {
    DialogCard
  }
};
</script>
