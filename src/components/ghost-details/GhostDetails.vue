<template>
  <v-card>
    <div class="title mb-5">Ghost Details</div>
    <v-divider></v-divider>
    <v-row>
      <v-col class="grow">URI</v-col>
      <v-col class="shrink">
        {{ ghostURI }}
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col class="grow">Map ID</v-col>
      <v-col class="shrink">
        <v-btn
          v-if="hasMapId"
          @click="showMapId = !showMapId"
          small
          color="primary"
        >
          <v-icon>{{ showMapId ? mdiEyeOff : mdiEye }}</v-icon>
        </v-btn>
      </v-col>
      <v-col class="shrink">
        <map-id :token="token" :ghost="selectedGhost"></map-id>
      </v-col>
    </v-row>
    <v-expand-transition>
      <div v-if="showMapId">
        <v-divider></v-divider>
        <v-row>
          <v-col>{{ selectedGhost.mapID }}</v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <v-divider></v-divider>
    <v-row>
      <v-col class="grow">Transfer Ownership</v-col>
      <v-col class="shrink">
        <transfer-ownership
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></transfer-ownership>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col class="grow">Disable Data</v-col>
      <v-col class="shrink">
        <disable-data
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></disable-data>
      </v-col>
    </v-row>
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
