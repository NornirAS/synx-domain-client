<template>
  <div>
    <v-text-field v-model="username" outlined label="E-mail" type="text" dense>
      <template v-slot:append-outer>
        <v-btn class="text-capitalize ml-4" color="primary">
          <v-icon>{{ mdiPlus }}</v-icon>
          Add receiver
        </v-btn>
      </template>
    </v-text-field>
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
  }
};
</script>
