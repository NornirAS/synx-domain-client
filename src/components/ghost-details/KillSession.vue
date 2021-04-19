<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="text-capitalize"
        color="primary"
        small
      >
        <v-icon>{{ mdiSkullCrossbones }}</v-icon>
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Kill Connection</div>
      <div slot="body">
        Are you sure you want to kill connection to
        <span class="font-weight-bold">{{ ghostURI }}?</span>
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
          @click="killSession"
          class="text-capitalize"
          color="info"
          rounded
          small
          >Confirm Kill
        </v-btn>
      </div>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiSkullCrossbones } from "@mdi/js";
import DialogCard from "../DialogCard";
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
