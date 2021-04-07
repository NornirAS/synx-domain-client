<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="text-capitalize mt-4"
        color="primary"
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
          color="primary"
          text
          small
          >Cancel</v-btn
        >
        <v-btn
          @click="deleteService"
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
import { mapState, mapGetters } from "vuex";
import DialogCard from "../DialogCard";
export default {
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
        domain: this.domain,
        service: this.name,
        instance: "0"
      });
      this.dialog = false;
    }
  },
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("serviceForm", ["domain", "name"]),
    ...mapGetters("serviceForm", ["serviceURI"])
  },
  components: {
    DialogCard
  }
};
</script>
