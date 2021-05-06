<template>
  <div class="d-flex">
    <v-text-field
      v-model="editedItem.name"
      class="shrink mr-4"
      label="Element"
      outlined
      dense
      :readonly="!isEditItem"
    ></v-text-field>
    <v-textarea
      v-model="editedItem.description"
      class="grow"
      label="Element Description"
      rows="1"
      outlined
      dense
      :readonly="!isEditItem"
    ></v-textarea>
    <v-btn @click="editItem(editedItem)" color="primary" class="ml-2" icon>
      <v-icon>{{ isEditItem ? mdiCheck : mdiPencil }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="deleteItem" v-bind="attrs" v-on="on" color="error" icon>
          <v-icon>{{ mdiTrashCanOutline }}</v-icon>
        </v-btn>
      </template>
      <dialog-card>
        <div slot="title">Delete Element Description</div>
        <div slot="text">
          Are you sure you want to delete this element description?
        </div>
        <v-btn slot="cancel-btn" color="primary" text @click="closeDelete" small
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
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mdiTrashCanOutline, mdiPencil, mdiCheck } from "@mdi/js";
import DialogCard from "../../../globals/DialogCard";
export default {
  props: ["element", "index"],
  data() {
    return {
      mdiTrashCanOutline,
      mdiPencil,
      mdiCheck,
      defaultItem: {
        name: "",
        description: ""
      },
      editedItem: {
        name: "",
        description: ""
      },
      dialogDelete: false,
      isEditItem: false
    };
  },

  mounted() {
    if (this.element) {
      this.editedItem = Object.assign({}, this.element);
    }
  },

  methods: {
    ...mapMutations("micropageForm", ["updateElement", "removeElement"]),

    editItem(editedItem) {
      if (this.isEditItem) {
        this.updateElement({
          index: this.index,
          element: editedItem
        });
        this.isEditItem = false;
      } else {
        this.isEditItem = true;
      }
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    deleteItem() {
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.removeElement(this.index);
      this.closeDelete();
    }
  },

  components: {
    DialogCard
  }
};
</script>
