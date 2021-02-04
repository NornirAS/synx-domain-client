<template>
  <div>
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
        <div slot="body">
          <v-form
            id="read-access"
            ref="readAccess"
            v-model="valid"
            @submit.prevent="submitForm"
            lazy-validation
          >
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Email of other user"
              required
              outlined
              dense
            ></v-text-field>
          </v-form>
        </div>
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
            type="submit"
            form="read-access"
            class="text-capitalize"
            color="primary"
            rounded
            small
          >
            Confirm
          </v-btn>
        </div>
      </dialog-card>
    </v-dialog>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr v-for="(user, index) in usersWithReadAccess" :key="index">
            <td class="body-1">{{ user.name }}</td>
            <td>
              <v-btn
                @click="removeReadAccess(user.name)"
                class="float-right"
                color="primary"
                icon
              >
                <v-icon>{{ mdiTrashCanOutline }}</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import DialogCard from "../DialogCard";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiPlus,
      mdiTrashCanOutline,
      username: "",
      valid: false,
      usernameRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      dialog: false
    };
  },
  methods: {
    submitForm() {
      const isFormValid = this.$refs.readAccess.validate();
      if (isFormValid) {
        this.$socket.emit("give_read_access", {
          domain: this.ghost.domain,
          service: this.ghost.service,
          token: this.token,
          username: this.username,
          instance: this.ghost.instance
        });
        this.dialog = false;
      }
    },
    removeReadAccess(username) {
      this.$socket.emit("remove_read_access", {
        domain: this.ghost.domain,
        service: this.ghost.service,
        token: this.token,
        username,
        instance: this.ghost.instance
      });
    }
  },
  computed: {
    usersWithReadAccess() {
      return this.$store.state.instancesModule.ghostStatus["Read Access"];
    }
  },
  components: {
    DialogCard
  }
};
</script>
