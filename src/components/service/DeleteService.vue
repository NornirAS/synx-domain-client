<template>
  <v-alert prominent dense text type="error">
    <v-row align="center">
      <v-col class="grow">
        <div class="title text-capitalize">Danger zone</div>
      </v-col>
      <v-col class="shrink">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="error" small>
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
            <v-btn
              slot="cancel-btn"
              @click="dialog = false"
              color="primary"
              text
              small
              >Cancel</v-btn
            >
            <v-btn
              slot="confirm-btn"
              @click="deleteService"
              color="primary"
              small
              >Confirm
            </v-btn>
          </dialog-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mdiTrashCanOutline } from "@mdi/js";
import { mapState, mapGetters } from "vuex";
import DialogCard from "../globals/DialogCard";
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
