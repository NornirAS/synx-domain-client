<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="text-capitalize mt-4"
        color="secondary"
        small
        rounded
      >
        <v-icon left small>{{ mdiTrashCanOutline }}</v-icon>
        Delete Service
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Delete Service</div>
      <div slot="body">
        Are you sure you want to delete service
        <span class="font-weight-bold">{{ serviceURI }}?</span>
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
          @click="deleteService"
          class="text-capitalize"
          color="primary"
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
export default {
  data() {
    return {
      mdiTrashCanOutline,
      dialog: false
    };
  },
  methods: {
    deleteService() {
      this.$socket.emit("delete_service", this.deleteServiceParams);
      this.dialog = false;
    }
  },
  computed: {
    serviceURI() {
      return this.$store.getters["serviceFormModule/serviceURI"];
    },
    deleteServiceParams() {
      return this.$store.getters["serviceFormModule/deleteServiceParams"];
    }
  },
  components: {
    DialogCard: () => import("../DialogCard")
  }
};
</script>
