<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header class="subtitle-1">
        <template v-slot:actions>
          <v-icon color="primary" class="icon">$expand</v-icon>
        </template>
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
        <template v-slot:actions>
          <v-icon color="primary" class="icon">$expand</v-icon>
        </template>
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
        <template v-slot:actions>
          <v-icon color="primary" class="icon">$expand</v-icon>
        </template>
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
</template>
<script>
import { mapState } from "vuex";
import ExternalLinking from "../ghost-details/ExternalLinking";
import AddReadAccess from "../ghost-details/read-access/AddReadAccess";
import RemoveReadAccess from "../ghost-details/read-access/RemoveReadAccess";
import AddSecondaryService from "../ghost-details/secondary-service/AddSecondaryService";
import RemoveSecondaryService from "../ghost-details/secondary-service/RemoveSecondaryService";
export default {
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("ghostDetails", ["selectedGhost"])
  },
  components: {
    AddReadAccess,
    RemoveReadAccess,
    ExternalLinking,
    AddSecondaryService,
    RemoveSecondaryService
  }
};
</script>
