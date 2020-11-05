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
    <ChangeOwner />
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
      ]
    };
  },
  methods: {
    changeOwner(item) {
      const dialogTitle = `Change Owner of an instances: ${item.instance}`;
      this.$store.commit("instancesModule/dialogTitle", dialogTitle);
      this.$store.commit("instancesModule/selectInstance", item.instance);
      this.$store.commit("instancesModule/toggleDialog");
    },
    mapID(item) {
      this.formTitle = `Change objectID to mapID of an instances: ${item.instance}`;
      this.$store.commit("instancesModule/toggleDialog");
    },
    killSession(item) {
      this.formTitle = `Kill session of an instances:  ${item.instance}`;
      this.$store.commit("instancesModule/toggleDialog");
    },
    removeInstance(item) {
      this.formTitle = `Remove an instances: ${item.instance}`;
      this.$store.commit("instancesModule/toggleDialog");
    }
  },
  components: {
    ChangeOwner
  }
};
</script>
