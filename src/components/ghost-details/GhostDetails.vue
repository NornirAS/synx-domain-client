<template>
  <div>
    <v-card>
      <div class="title mb-5">Ghost Details</div>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-title>URI</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ ghostURI }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-title>Map ID</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          <map-id :token="token" :ghost="selectedGhost"></map-id>
        </v-list-item-subtitle>
      </v-list-item>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-1">
          Make ghost data available for secondary services
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <external-linking
            :token="token"
            :ghost="selectedGhost"
          ></external-linking>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-1">
          Read access
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <add-read-access
            :token="token"
            :ghost="selectedGhost"
          ></add-read-access>
          <remove-read-access
            :token="token"
            :ghost="selectedGhost"
          ></remove-read-access>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-1">
          Add Morphed Ghosts
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <add-secondary-service
            :token="token"
            :ghost="selectedGhost"
          ></add-secondary-service>
          <remove-secondary-service
            :token="token"
            :ghost="selectedGhost"
          ></remove-secondary-service>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ExternalLinking from "../ghost-details/ExternalLinking";
import AddReadAccess from "../ghost-details/read-access/AddReadAccess";
import RemoveReadAccess from "../ghost-details/read-access/RemoveReadAccess";
import AddSecondaryService from "../ghost-details/secondary-service/AddSecondaryService";
import RemoveSecondaryService from "../ghost-details/secondary-service/RemoveSecondaryService";
import MapId from "../ghost-details/MapId";
export default {
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("ghostDetails", ["selectedGhost"]),
    ...mapGetters("ghostDetails", ["ghostURI"])
  },
  components: {
    AddReadAccess,
    RemoveReadAccess,
    ExternalLinking,
    AddSecondaryService,
    RemoveSecondaryService,
    MapId
  }
};
</script>
