<template>
  <v-card class="py-0">
    <v-row align="center">
      <v-col class="grow">
        <div class="body-1 text-capitalize">Delete Service</div>
      </v-col>
      <v-col class="shrink">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary" small>
              <v-icon>{{ mdiTrashCanOutline }}</v-icon>
            </v-btn>
          </template>
          <dialog-card>
            <div slot="title">Delete Service</div>
            <v-alert slot="text" prominent text type="error">
              Are you sure you want to delete service
              <span class="font-weight-bold">{{ serviceURI }}?</span>
            </v-alert>
            <v-switch
              slot="input"
              class="mt-0 pt-0"
              v-model="deleteApprove"
              :label="deleteApprove === true ? 'Yes' : 'No'"
              inset
            ></v-switch>
            <v-btn
              slot="cancel-btn"
              @click="cancel()"
              color="primary"
              text
              small
              >Cancel</v-btn
            >
            <v-btn
              slot="confirm-btn"
              @click="deleteService"
              :disabled="!deleteApprove"
              color="primary"
              small
              >Confirm
            </v-btn>
          </dialog-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiTrashCanOutline } from "@mdi/js";
import { mapState, mapGetters } from "vuex";
import DialogCard from "../globals/DialogCard";
export default {
  data() {
    return {
      mdiTrashCanOutline,
      dialog: false,
      deleteApprove: false
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
    },
    cancel() {
      this.dialog = false;
      this.deleteApprove = false;
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
