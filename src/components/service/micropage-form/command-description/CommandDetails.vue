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
                  <v-form
                    id="form"
                    ref="form"
                    v-model="valid"
                    @submit.prevent="save"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="editedItem.command"
                      :rules="commandRules"
                      :label="commandLabel"
                      outlined
                      dense
                      validate-on-blur
                    ></v-text-field>

                    <v-text-field
                      v-model="editedItem.param1"
                      :rules="param1Rules"
                      :label="param1Label"
                      outlined
                      dense
                    ></v-text-field>

                    <v-text-field
                      v-model="editedItem.param2"
                      :rules="param2Rules"
                      :label="param2Label"
                      outlined
                      dense
                    ></v-text-field>

                    <v-textarea
                      v-model="editedItem.description"
                      :rules="descriptionRules"
                      :label="descriptionLabel"
                      :counter="descriptionMaxLen"
                      outlined
                      dense
                    ></v-textarea>
                  </v-form>
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
                <v-btn
                  slot="confirm-btn"
                  color="primary"
                  type="submit"
                  form="form"
                  small
                >
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
import { mapState, mapMutations, mapGetters } from "vuex";
import { requiredRule, lengthRule } from "../../../../input-rules";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import DialogCard from "../../../globals/DialogCard";
export default {
  data() {
    return {
      mdiPencil,
      mdiTrashCanOutline,
      valid: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "command"
        },
        { text: "", value: "param1", sortable: false },
        { text: "", value: "param2", sortable: false },
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
      },
      commandLabel: "Command",
      commandMaxLen: 16,
      commandRules: [
        v => requiredRule(v, this.commandLabel),
        v => lengthRule(v, this.commandLabel, this.commandMaxLen)
      ],
      param1Label: "Param1",
      param1MaxLen: 16,
      param1Rules: [v => lengthRule(v, this.param1Label, this.param1MaxLen)],
      param2Label: "Param2",
      param2MaxLen: 16,
      param2Rules: [v => lengthRule(v, this.param2Label, this.param2MaxLen)],
      descriptionLabel: "Command Description",
      descriptionMaxLen: 512,
      descriptionRules: [
        v => lengthRule(v, this.descriptionLabel, this.descriptionMaxLen)
      ]
    };
  },

  mounted() {
    this.commands = this.commandOverview.commands;
    // Dinamically add command elements to header of a table
    for (let i = 0; i < this.commandElements.length; i++) {
      this.headers[i].text = this.commandElements[i];
    }
  },

  computed: {
    ...mapState("micropageForm", ["commandOverview"]),
    ...mapGetters("serviceForm", ["commandElements"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Command" : "Edit Command";
    }
  },

  watch: {
    commandOverview(newValue) {
      this.commands = newValue.commands;
      this.addHeaders(this.commandElements);
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
      "removeCommand",
      "addHeaders"
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
      const isValid = this.$refs.form.validate();
      if (isValid) {
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
