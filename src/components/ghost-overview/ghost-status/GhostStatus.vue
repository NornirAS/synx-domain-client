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
import ExternalLinking from "./ExternalLinking";
import AddReadAccess from "./read-access/AddReadAccess";
import RemoveReadAccess from "./read-access/RemoveReadAccess";
import AddSecondaryService from "./secondary-service/AddSecondaryService";
import RemoveSecondaryService from "./secondary-service/RemoveSecondaryService";
export default {
  created() {
    this.getGhostStatus();
  },
  methods: {
    getGhostStatus() {
      this.$socket.emit("get_ghost_status", {
        token: this.token,
        username: this.username,
        domain: this.selectedGhost.domain,
        service: this.selectedGhost.service,
        instance: this.selectedGhost.instance
      });
    }
  },
  computed: {
    ...mapState("authentication", ["token", "username"]),
    ...mapState("ghostDetails", ["selectedGhost"]),
    ...mapState("alert", [
      "tranferOwnershipSuccess",
      "giveReadAccessSuccess",
      "removeReadAccessSuccess",
      "addPrimaryGhostSuccess",
      "removePrimaryGhostSuccess"
    ])
  },
  watch: {
    giveReadAccessSuccess() {
      this.getGhostStatus();
    },
    removeReadAccessSuccess() {
      this.getGhostStatus();
    },
    addPrimaryGhostSuccess() {
      this.getGhostStatus();
    },
    removePrimaryGhostSuccess() {
      this.getGhostStatus();
    }
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
