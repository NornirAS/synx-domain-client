<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr
          v-for="({ uri, refDomain, refService, refObjectID },
          index) in ghostSecondaryService"
          :key="index"
        >
          <td class="body-1">{{ uri }}</td>
          <td>
            <v-btn
              @click="
                removeSecondaryService(refDomain, refService, refObjectID)
              "
              class="float-right"
              color="error"
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
import { mapState } from "vuex";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiTrashCanOutline
    };
  },
  methods: {
    removeSecondaryService(refDomain, refService, refObjectID) {
      this.$socket.emit("remove_primary_ghost", {
        domain: this.ghost.domain,
        service: this.ghost.service,
        token: this.token,
        instance: this.ghost.instance,
        refDomain,
        refService,
        refObjectID
      });
    }
  },
  computed: {
    ...mapState("ghostDetails", ["ghostSecondaryService"])
  }
};
</script>
