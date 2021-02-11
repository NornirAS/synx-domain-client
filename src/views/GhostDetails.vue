<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ ghost.service.toLowerCase() }}#{{ ghost.instance }}
      </div>
    </page-title>
    <div slot="page-content">
      <v-card>
        <div class="title mb-5">Details</div>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title>URI</v-list-item-title>
          <v-list-item-subtitle class="text-right font-weight-bold">
            {{ ghostURI }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title>Map ID</v-list-item-title>
          <v-list-item-subtitle class="text-right font-weight-bold">
            <map-id :token="token" :ghost="ghost"></map-id>
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header class="subtitle-1">
            Make data available for external linking?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <external-linking :token="token" :ghost="ghost"></external-linking>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="subtitle-1">
            Read access
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <add-read-access :token="token" :ghost="ghost"></add-read-access>
            <remove-read-access
              :token="token"
              :ghost="ghost"
            ></remove-read-access>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="subtitle-1">
            Secondary Service
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <add-secondary-service
              :token="token"
              :ghost="ghost"
            ></add-secondary-service>
            <remove-secondary-service
              :token="token"
              :ghost="ghost"
            ></remove-secondary-service>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div slot="page-content-right">
      <div class="title">Other Actions</div>
      <kill-session
        :token="token"
        :ghost="ghost"
        :ghostURI="ghostURI"
      ></kill-session>
      <transfer-ownership
        :token="token"
        :ghost="ghost"
        :ghostURI="ghostURI"
      ></transfer-ownership>
      <remove-ghost
        :token="token"
        :ghost="ghost"
        :ghostURI="ghostURI"
      ></remove-ghost>
    </div>
  </page-layout>
</template>

<script>
import { mdiPlus, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ExternalLinking from "../components/ghost-details/ExternalLinking";
import AddReadAccess from "../components/ghost-details/read-access/AddReadAccess";
import RemoveReadAccess from "../components/ghost-details/read-access/RemoveReadAccess";
import AddSecondaryService from "../components/ghost-details/secondary-service/AddSecondaryService";
import RemoveSecondaryService from "../components/ghost-details/secondary-service/RemoveSecondaryService";
import KillSession from "../components/ghost-details/KillSession";
import TransferOwnership from "../components/ghost-details/TransferOwnership";
import RemoveGhost from "../components/ghost-details/RemoveGhost";
import MapId from "../components/ghost-details/MapId";
export default {
  data() {
    return {
      mdiPlus,
      mdiChevronDown,
      mdiChevronUp
    };
  },
  created() {
    this.$socket.emit("get_ghost_status", {
      domain: this.domain,
      token: this.token,
      username: this.username,
      service: this.service,
      instance: this.instance
    });
  },
  beforeDestroy() {
    this.$store.commit("instancesModule/resetGhostStatus");
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    ghost() {
      return this.$store.state.instancesModule.selectedGhost;
    },
    domain() {
      return this.ghost.domain.toLowerCase();
    },
    service() {
      return this.ghost.service.toLowerCase();
    },
    instance() {
      return this.ghost.instance;
    },
    ghostURI() {
      return `${this.domain}.cioty.com/${this.service}#${this.instance}`;
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
