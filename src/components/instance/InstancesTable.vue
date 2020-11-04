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
    <v-data-table :headers="headers" :items="instances" :search="search">
      <template v-slot:top>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>Cancel</v-btn>
              <v-btn color="blue darken-1" text>OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
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
export default {
  props: ["instances"],
  data() {
    return {
      mdiAccountSwitchOutline,
      mdiSkullCrossbones,
      mdiPencilOutline,
      mdiClose,
      search: "",
      dialog: false,
      dialogDelete: false,
      formTitle: null,
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
      editedIndex: -1
    };
  },
  methods: {
    changeOwner(item) {
      this.formTitle = `Change Owner of ${item}`;
      this.dialog = true;
    },
    mapID(item) {
      this.formTitle = `Change objectID to mapID ${item}`;
      this.dialog = true;
    },
    killSession(item) {
      this.formTitle = `Kill session of ${item}`;
      this.dialog = true;
    },
    removeInstance(item) {
      this.formTitle = `Remove ${item}`;
      this.dialog = true;
    }
  }
};
</script>
