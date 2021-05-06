<template>
  <v-expansion-panels slot="action" accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:actions>
          <v-icon color="primary" class="icon">$expand</v-icon>
        </template>
        Command Details
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table :headers="headers" :items="commands" hide-default-footer>
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  small
                >
                  Add command details
                </v-btn>
              </template>
              <dialog-card>
                <div slot="title">{{ formTitle }}</div>
                <div slot="input">
                  <v-text-field
                    v-model="editedItem.command"
                    label="Command"
                    outlined
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.param1"
                    label="Param1"
                    outlined
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.param2"
                    label="Param2"
                    outlined
                    dense
                  ></v-text-field>

                  <v-textarea
                    v-model="editedItem.description"
                    label="Command Description"
                    outlined
                    dense
                  ></v-textarea>
                </div>

                <v-btn
                  slot="cancel-btn"
                  color="primary"
                  text
                  @click="close"
                  small
                >
                  Cancel
                </v-btn>
                <v-btn slot="confirm-btn" color="primary" @click="save" small>
                  Save
                </v-btn>
              </dialog-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <dialog-card>
                <div slot="title">Remove Command Description</div>
                <div slot="text">
                  Are you sure you want to delete this command description?
                </div>
                <v-btn
                  slot="cancel-btn"
                  color="primary"
                  text
                  @click="closeDelete"
                  small
                  >Cancel</v-btn
                >
                <v-btn
                  slot="confirm-btn"
                  color="primary"
                  @click="deleteItemConfirm"
                  small
                  >Confirm</v-btn
                >
              </dialog-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="editItem(item)" color="primary">
              {{ mdiPencil }}
            </v-icon>
            <v-icon @click="deleteItem(item)" color="error">
              {{ mdiTrashCanOutline }}
            </v-icon>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import DialogCard from "../../../globals/DialogCard";
export default {
  data: () => ({
    mdiPencil,
    mdiTrashCanOutline,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "CMD",
        align: "start",
        sortable: false,
        value: "command"
      },
      { text: "PARAM1", value: "param1", sortable: false },
      { text: "PARAM2", value: "param2", sortable: false },
      { text: "Description", value: "description", sortable: false },
      { text: "Actions", value: "actions", sortable: false, align: "end" }
    ],
    commands: [],
    editedIndex: -1,
    editedItem: {
      command: "",
      param1: "",
      param2: "",
      description: ""
    },
    defaultItem: {
      command: "",
      param1: "",
      param2: "",
      description: ""
    }
  }),

  computed: {
    ...mapState("micropageForm", ["commandOverview"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Command" : "Edit Command";
    }
  },

  watch: {
    commandOverview(newValue) {
      this.commands = newValue.commands;
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  methods: {
    ...mapMutations("micropageForm", [
      "addCommand",
      "updateCommand",
      "removeCommand"
    ]),

    editItem(item) {
      this.editedIndex = this.commands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.commands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.removeCommand(this.editedIndex);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateCommand({
          index: this.editedIndex,
          command: this.editedItem
        });
      } else {
        this.addCommand(this.editedItem);
      }
      this.close();
    }
  },
  components: {
    DialogCard
  }
};
</script>

<style scoped>
.v-expansion-panels {
  border-left: 5px solid var(--v-primary-base);
}
</style>
