<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr
          v-for="({ uri, refDomain, refService, refObjectID },
          index) in updatedSecondaryServices"
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
import _ from "lodash";
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
      return this.$store.state.instancesModule.ghostStatus["Secondary Service"];
    },
    noSecondaryServices() {
      return _.isEmpty(this.secondaryServices);
    },
    updatedSecondaryServices() {
      if (!this.noSecondaryServices) {
        const beforeSlash = /(.*?)(?=\/)/;
        const betweenSlashes = /(?<=\/)(.*?)(?=\/)/;
        const afterSlash = /(?<=\/)\d+/;
        return this.secondaryServices.map(service => {
          const refDomain = service.name.match(beforeSlash);
          const refService = service.name.match(betweenSlashes);
          const refObjectID = service.name.match(afterSlash);
          service.refDomain = refDomain[0];
          service.refService = refService[0];
          service.refObjectID = refObjectID[0];
          service.uri = `${refDomain[0]}.cioty.com/${refService[0]}#${refObjectID[0]}`.toLowerCase();
          return service;
        });
      } else {
        return [];
      }
    }
  }
};
</script>
