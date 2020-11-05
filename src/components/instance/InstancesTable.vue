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
    </v-data-table>
  </v-card>
</template>

<script>
import {
  mdiAccountSwitchOutline,
  mdiSkullCrossbones,
  mdiClose,
  mdiPencilOutline
} from "@mdi/js";
import ChangeOwner from "./dialogs/ChangeOwner";
import MapId from "./dialogs/MapId";
import KillSession from "./dialogs/KillSession";
import RemoveInstance from "./dialogs/RemoveInstance";
export default {
  props: ["instances"],
  data() {
    return {
      mdiAccountSwitchOutline,
      mdiSkullCrossbones,
      mdiPencilOutline,
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
        { text: "Remove", align: "center", value: "remove", sortable: false }
      ],
      dialogTitle: null,
      dialogChangeOwner: false,
      dialogMapId: false,
      dialogKillSession: false,
      dialogRemoveInstance: false
    };
  },
  methods: {
    // actionButton(item) {
    //   this.hideAllDialogs();
    //   this.dialogChangeOwner = true;
    //   this.openDialogWithSelecetdData(item);
    // },
    changeOwner(item) {
      this.hideAllDialogs();
      this.dialogChangeOwner = true;
      this.dialogTitle = `Change Owner of an instances: ${item.instance}`;
      this.openDialogWithSelecetdData(item);
    },
    mapID(item) {
      this.hideAllDialogs();
      this.dialogMapId = true;
      this.dialogTitle = `Change objectID to mapID of an instance: ${item.instance}`;
      this.openDialogWithSelecetdData(item);
    },
    killSession(item) {
      this.hideAllDialogs();
      this.dialogKillSession = true;
      this.dialogTitle = `Kill session for an instance: ${item.instance}`;
      this.openDialogWithSelecetdData(item);
    },
    removeInstance(item) {
      this.hideAllDialogs();
      this.dialogRemoveInstance = true;
      this.dialogTitle = `Remove instance: ${item.instance}`;
      this.openDialogWithSelecetdData(item);
    },
    openDialogWithSelecetdData(item) {
      this.$store.commit("instancesModule/dialogTitle", this.dialogTitle);
      this.$store.commit("instancesModule/selectInstance", item.instance);
      this.$store.commit("instancesModule/openDialog");
    },
    hideAllDialogs() {
      this.dialogChangeOwner = false;
      this.dialogMapId = false;
      this.dialogKillSession = false;
      this.dialogRemoveInstance = false;
    }
  },
  components: {
    ChangeOwner,
    MapId,
    KillSession,
    RemoveInstance
  }
};
</script>
