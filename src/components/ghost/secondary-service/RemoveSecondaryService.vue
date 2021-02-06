<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr
          v-for="({ uri, refDomain, refService, refObjectID },
          index) in secondaryServices"
          :key="index"
        >
          <td class="body-1">{{ uri }}</td>
          <td>
            <v-btn
              @click="
                removeSecondaryService(refDomain, refService, refObjectID)
              "
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
    removeSecondaryService(refDomain, refService, refObjectID) {
      this.$socket.emit("remove_secondary_service", {
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
    secondaryServices() {
      return this.$store.state.instancesModule.ghostSecondaryService;
    }
  }
};
</script>
