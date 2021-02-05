<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ ghost.service.toLowerCase() }}#{{ ghost.instance }}
      </div>
    </page-title>
    <div slot="page-content">
      <v-card>
        <v-list>
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
              <v-btn class="text-capitalize" color="primary" text>
                <v-icon small>{{ mdiPlus }}</v-icon>
                Add map ID
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
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
      <!-- <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title
              >Make data available for external linking?</v-list-item-title
            >
            <v-list-item-subtitle class="text-right font-weight-bold">
              <v-btn color="primary" icon>
                <v-icon>{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Read access to data</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
              <read-access :token="token" :ghost="ghost"></read-access>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>
              Add object to a secondary service
            </v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
              <v-btn class="text-capitalize" color="primary" text>
                <v-icon small>{{ mdiPlus }}</v-icon>
                Add map ID
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Kill Session</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
              <v-btn class="text-capitalize" color="primary" text>
                <v-icon small>{{ mdiPlus }}</v-icon>
                Kill Session
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Change Ownership</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
              <v-btn class="text-capitalize" color="primary" text>
                <v-icon small>{{ mdiPlus }}</v-icon>
                Add map ID
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Remove Ghost</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
              <v-btn class="text-capitalize" color="primary" text>
                <v-icon small>{{ mdiPlus }}</v-icon>
                Add map ID
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider> -->
    </div>
  </page-layout>
</template>

<script>
import { mdiPlus, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import ExternalLinking from "../components/instance/ExternalLinking";
import AddReadAccess from "../components/instance/read-access/AddReadAccess";
import RemoveReadAccess from "../components/instance/read-access/RemoveReadAccess";
import AddSecondaryService from "../components/instance/secondary-service/AddSecondaryService";
import RemoveSecondaryService from "../components/instance/secondary-service/RemoveSecondaryService";
export default {
  data() {
    return {
      mdiPlus,
      mdiChevronDown,
      mdiChevronUp
    };
  },
  created() {
    this.$socket.emit("instance_status", {
      domain: this.domain,
      token: this.token,
      username: this.username,
      service: this.service,
      instance: this.instance
    });
  },
  methods: {
    confirm(item) {
      this.$socket.emit(
        "confirm_instance",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    },
    deny(item) {
      this.$socket.emit(
        "deny_instance",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    }
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
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("look_for_new_instances", this.token, this.username);
    }
  },
  components: {
    PageLayout,
    PageTitle,
    AddReadAccess,
    RemoveReadAccess,
    ExternalLinking,
    AddSecondaryService,
    RemoveSecondaryService
  }
};
</script>
