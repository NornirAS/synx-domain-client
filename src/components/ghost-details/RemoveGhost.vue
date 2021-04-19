<template>
  <v-alert prominent text dense type="error" class="mt-4">
    <v-row align="center">
      <v-col class="grow">
        <div class="title text-capitalize">Danger zone</div>
      </v-col>
      <v-col class="shrink">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="text-capitalize"
              color="error"
              rounded
              small
            >
              <v-icon left small>{{ mdiTrashCanOutline }}</v-icon>
              Remove Ghost
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
                color="primary"
                text
                small
                >Cancel</v-btn
              >
              <v-btn
                @click="removeGhost"
                class="text-capitalize"
                color="info"
                rounded
                small
                >Confirm Removal
              </v-btn>
            </div>
          </dialog-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { mdiTrashCanOutline } from "@mdi/js";
import DialogCard from "../globals/DialogCard";
export default {
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
