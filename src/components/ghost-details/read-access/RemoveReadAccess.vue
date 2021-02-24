<template>
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
</template>

<script>
import { mdiTrashCanOutline } from "@mdi/js";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiTrashCanOutline
    };
  },
  methods: {
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
      return this.$store.state.ghosts.ghostReadAccess;
    }
  }
};
</script>
