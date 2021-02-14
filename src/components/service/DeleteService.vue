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
  props: ["token", "service"],
  data() {
    return {
      mdiTrashCanOutline,
      dialog: false
    };
  },
  methods: {
    deleteService() {
      this.$socket.emit("delete_service", {
        token: this.token,
        domain: this.service.domain,
        service: this.service.serviceName,
        instance: "0"
      });
      this.dialog = false;
    }
  },
  computed: {
    serviceURI() {
      return `${this.service.domain}.cioty.com/${this.service.serviceName}`;
    }
  },
  components: {
    DialogCard: () => import("../DialogCard")
  }
};
</script>
