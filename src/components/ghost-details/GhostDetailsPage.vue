<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        Ghost Details Overview:
      </div>
      <div slot="subtitle">
        {{ domainURI }}<span class="font-weight-bold">{{ ghostID }}</span>
      </div>
    </page-title>
    <div slot="page-content">
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
    <div slot="page-content-right">
      <div class="title">Other Actions</div>
      <div>
        <kill-session
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></kill-session>
      </div>
      <div>
        <transfer-ownership
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></transfer-ownership>
      </div>
      <div>
        <remove-ghost
          :token="token"
          :ghost="selectedGhost"
          :ghostURI="ghostURI"
        ></remove-ghost>
      </div>
    </div>
  </page-layout>
</template>

<script>
import { mdiPlus, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { rootDomain } from "../../core/config";
import { mapState, mapGetters } from "vuex";
import PageTitle from "../PageTitle";
import PageLayout from "../PageLayout";
import ExternalLinking from "../ghost-details/ExternalLinking";
import AddReadAccess from "../ghost-details/read-access/AddReadAccess";
import RemoveReadAccess from "../ghost-details/read-access/RemoveReadAccess";
import AddSecondaryService from "../ghost-details/secondary-service/AddSecondaryService";
import RemoveSecondaryService from "../ghost-details/secondary-service/RemoveSecondaryService";
import KillSession from "../ghost-details/KillSession";
import TransferOwnership from "../ghost-details/TransferOwnership";
import RemoveGhost from "../ghost-details/RemoveGhost";
import MapId from "../ghost-details/MapId";
export default {
  data() {
    return {
      mdiPlus,
      mdiChevronDown,
      mdiChevronUp,
      rootDomain
    };
  },
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
    ...mapState("alarmModule", [
      "giveReadAccessSuccess",
      "removeReadAccessSuccess",
      "addPrimaryGhostSuccess",
      "removePrimaryGhostSuccess"
    ]),
    ...mapGetters("ghostDetails", [
      "ghostStatusParams",
      "domainURI",
      "ghostID",
      "ghostURI"
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
    PageLayout,
    PageTitle,
    AddReadAccess,
    RemoveReadAccess,
    ExternalLinking,
    AddSecondaryService,
    RemoveSecondaryService,
    KillSession,
    TransferOwnership,
    RemoveGhost,
    MapId
  }
};
</script>

<style scoped>
.v-list-item__subtitle {
  white-space: break-spaces;
}
</style>
