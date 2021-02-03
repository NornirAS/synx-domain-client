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
      <div slot="body"></div>
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
          @click="dialog = false"
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
  data() {
    return {
      mdiPlus,
      dialog: false
    };
  },
  components: {
    DialogCard
  }
};
</script>
