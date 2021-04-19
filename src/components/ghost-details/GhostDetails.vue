<template>
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
        <v-btn
          v-if="hasMapId"
          @click="showMapId = !showMapId"
          small
          color="primary"
          class="mr-4"
        >
          <v-icon>{{ showMapId ? mdiEyeOff : mdiEye }}</v-icon>
        </v-btn>
        <map-id :token="token" :ghost="selectedGhost"></map-id>
      </v-list-item-subtitle>
    </v-list-item>
    <v-divider v-if="showMapId"></v-divider>
    <v-list-item v-if="showMapId">
      <v-list-item-subtitle>{{ selectedGhost.mapID }}</v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-title>Transfer Ownership</v-list-item-title>
      <v-list-item-subtitle class="text-right">
        <transfer-ownership
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></transfer-ownership>
      </v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-title>Kill Session</v-list-item-title>
      <v-list-item-subtitle class="text-right">
        <disable-data
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></disable-data>
      </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { mapState, mapGetters } from "vuex";
import MapId from "../ghost-details/MapId";
import DisableData from "../ghost-details/DisableData";
import TransferOwnership from "../ghost-details/TransferOwnership";
export default {
  data() {
    return {
      mdiEye,
      mdiEyeOff,
      showMapId: false
    };
  },
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("ghostDetails", ["selectedGhost"]),
    ...mapGetters("ghostDetails", ["ghostURI"]),
    hasMapId() {
      return this.selectedGhost.mapID !== null;
    }
  },
  components: {
    MapId,
    DisableData,
    TransferOwnership
  }
};
</script>
