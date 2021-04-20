<template>
  <v-card class="mt-4 py-0">
    <v-row align="center">
      <v-col class="grow">
        <div class="body-1 text-capitalize">Remove ghost</div>
      </v-col>
      <v-col class="shrink">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary" small>
              <v-icon>{{ mdiTrashCanOutline }}</v-icon>
            </v-btn>
          </template>

          <dialog-card>
            <div slot="title">Remove Ghost</div>
            <div slot="body">
              <v-alert prominent text type="error">
                Are you sure you want to remove ghost for
                <span class="font-weight-bold">{{ ghostURI }}?</span>
              </v-alert>
              <v-switch
                v-model="removeApprove"
                :label="removeApprove === true ? 'Yes' : 'No'"
              ></v-switch>
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
              @click="removeGhost"
              :disabled="!removeApprove"
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
import { mapState, mapGetters } from "vuex";
import { mdiTrashCanOutline } from "@mdi/js";
import DialogCard from "../globals/DialogCard";
export default {
  data() {
    return {
      mdiTrashCanOutline,
      dialog: false,
      removeApprove: false
    };
  },
  methods: {
    removeGhost() {
      this.$socket.emit("remove_ghost", {
        domain: this.selectedGhost.domain,
        service: this.selectedGhost.service,
        token: this.token,
        instance: this.selectedGhost.instance
      });
      this.dialog = false;
      this.$router.push({ name: "ghosts" });
    }
  },
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("ghostDetails", ["selectedGhost"]),
    ...mapGetters("ghostDetails", ["ghostURI"])
  },
  components: {
    DialogCard
  }
};
</script>
