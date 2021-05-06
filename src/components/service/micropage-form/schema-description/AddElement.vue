<template>
  <div class="d-flex">
    <v-text-field
      v-model="editedItem.name"
      class="shrink mr-4"
      label="Element"
      outlined
      dense
    ></v-text-field>
    <v-textarea
      v-model="editedItem.description"
      class="grow"
      label="Element Description"
      rows="1"
      outlined
      dense
    ></v-textarea>
    <v-btn @click="addItem(editedItem)" color="accent" icon>
      <v-icon>{{ mdiPlus }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mdiPlus } from "@mdi/js";
export default {
  data() {
    return {
      mdiPlus,
      defaultItem: {
        name: "",
        description: ""
      },
      editedItem: {
        name: "",
        description: ""
      }
    };
  },

  methods: {
    ...mapMutations("micropageForm", ["addElement"]),
    addItem(item) {
      this.addElement(item);
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  }
};
</script>
