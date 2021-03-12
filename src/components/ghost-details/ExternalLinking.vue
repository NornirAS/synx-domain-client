<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="(link, index) in ghostLinkedTo" :key="index">
          <td class="body-1">{{ link.uri }}</td>
          <td>
            <v-switch
              @change="allowDenyLinking(link.name, link.active)"
              v-model="link.active"
              :label="link.active === true ? 'Yes' : 'No'"
              class="float-right"
              inset
              color="info"
            ></v-switch>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["token", "ghost"],
  methods: {
    allowDenyLinking(name, active) {
      this.$socket.emit("external_linking", {
        domain: this.ghost.domain,
        service: this.ghost.service,
        token: this.token,
        instance: this.ghost.instance,
        linkedTo: name,
        status: active
      });
    }
  },
  computed: {
    ...mapState("ghostDetails", ["ghostLinkedTo"])
  }
};
</script>
