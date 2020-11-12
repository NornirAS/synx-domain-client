<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
      ></v-text-field>
    </v-card-title>
    <ChangeOwner v-if="dialogChangeOwner" />
    <MapId v-if="dialogMapId" />
    <KillSession v-if="dialogKillSession" />
    <RemoveInstance v-if="dialogRemoveInstance" />
    <LinkableInstance v-if="dialogLinking" />
    <SecondaryService v-if="dialogSecondaryService" />
    <v-data-table :headers="headers" :items="instances" :search="search">
      <template v-slot:[`item.changeOwner`]="{ item }">
        <v-icon small @click="changeOwner(item)">
          {{ mdiAccountSwitchOutline }}
        </v-icon>
      </template>
      <template v-slot:[`item.mapID`]="{ item }">
        <v-icon small @click="mapID(item)">
          {{ mdiPencilOutline }}
        </v-icon>
      </template>
      <template v-slot:[`item.killSession`]="{ item }">
        <v-icon small @click="killSession(item)">
          {{ mdiSkullCrossbones }}
        </v-icon>
      </template>
      <template v-slot:[`item.remove`]="{ item }">
        <v-icon small @click="removeInstance(item)">
          {{ mdiClose }}
        </v-icon>
      </template>
      <template v-slot:[`item.more`]="{ item }">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(action, index) in moreActions" :key="index">
                <v-btn @click="action.method(item)" small text block>
                  {{ action.title }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {
  mdiAccountSwitchOutline,
  mdiSkullCrossbones,
  mdiClose,
  mdiPencilOutline,
  mdiChevronDown
} from "@mdi/js";
import ChangeOwner from "./dialogs/ChangeOwner";
import MapId from "./dialogs/MapId";
import KillSession from "./dialogs/KillSession";
import RemoveInstance from "./dialogs/RemoveInstance";
import LinkableInstance from "./dialogs/LinkableInstance";
import SecondaryService from "./dialogs/SecondaryService";
export default {
  props: ["instances"],
  data() {
    return {
      mdiAccountSwitchOutline,
      mdiSkullCrossbones,
      mdiPencilOutline,
      mdiChevronDown,
      mdiClose,
      search: "",
      headers: [
        {
          text: "Domain",
          align: "start",
          value: "domain"
        },
        { text: "Service", value: "service" },
        { text: "Instance", align: "center", value: "instance" },
        {
          text: "Change owner",
          align: "center",
          value: "changeOwner",
          sortable: false
        },
        { text: "Map ID", align: "center", value: "mapID", sortable: false },
        {
          text: "Kill Session",
          align: "center",
          value: "killSession",
          sortable: false
        },
        { text: "Remove", align: "center", value: "remove", sortable: false },
        { text: "More", align: "center", value: "more", sortable: false }
      ],
      moreActions: [
        {
          title: "Linking",
          method: this.linking
        },
        {
          title: "Secondary service",
          method: this.secondaryService
        },
        {
          title: "Read access",
          method: this.readAccess
        }
      ],
      dialogTitle: null,
      dialogChangeOwner: false,
      dialogMapId: false,
      dialogKillSession: false,
      dialogRemoveInstance: false,
      dialogLinking: false,
      dialogSecondaryService: false,
      dialogReadAccess: false
    };
  },
  methods: {
    changeOwner(item) {
      this.hideAllDialogs();
      this.dialogChangeOwner = true;
      this.dialogTitle = `Change Owner of an instances: "${item.instance}"`;
      this.openDialogWithSelecetdData(item);
    },
    mapID(item) {
      this.hideAllDialogs();
      this.dialogMapId = true;
      this.dialogTitle = `Change objectID to mapID of an instance: "${item.instance}"`;
      this.openDialogWithSelecetdData(item);
    },
    killSession(item) {
      this.hideAllDialogs();
      this.dialogKillSession = true;
      this.dialogTitle = `Kill session for an instance: "${item.instance}"`;
      this.openDialogWithSelecetdData(item);
    },
    removeInstance(item) {
      this.hideAllDialogs();
      this.dialogRemoveInstance = true;
      this.dialogTitle = `Remove instance: "${item.instance}"`;
      this.openDialogWithSelecetdData(item);
    },
    linking(item) {
      this.hideAllDialogs();
      this.dialogLinking = true;
      this.dialogTitle = `Allow/Deny instance "${item.instance}" to be linkable`;
      this.openDialogWithSelecetdData(item);
    },
    secondaryService(item) {
      this.hideAllDialogs();
      this.dialogSecondaryService = true;
      this.dialogTitle = `Add/Remove object "${item.instance}" to/from secondary service`;
      this.openDialogWithSelecetdData(item);
    },
    readAccess(item) {
      this.hideAllDialogs();
      this.dialogReadAccess = true;
      this.dialogTitle = `Give/Remove read access to instance "${item.instance}" to/from another user`;
      this.openDialogWithSelecetdData(item);
    },
    openDialogWithSelecetdData(item) {
      this.$store.commit("instancesModule/dialogTitle", this.dialogTitle);
      this.$store.commit("instancesModule/selectDomain", item.domain);
      this.$store.commit("instancesModule/selectService", item.service);
      this.$store.commit("instancesModule/selectInstance", item.instance);
      this.$store.commit("instancesModule/toggleDialog");
    },
    hideAllDialogs() {
      this.dialogChangeOwner = false;
      this.dialogMapId = false;
      this.dialogKillSession = false;
      this.dialogRemoveInstance = false;
      this.dialogLinking = false;
      this.dialogSecondaryService = false;
      this.dialogReadAccess = false;
    }
  },
  components: {
    ChangeOwner,
    MapId,
    KillSession,
    RemoveInstance,
    LinkableInstance,
    SecondaryService
  }
};
</script>
