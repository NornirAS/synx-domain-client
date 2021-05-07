<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          small
          :disabled="!hasPrivateElements"
        >
          {{ hasPrivateElements ? "Add Element" : "No more elements to add" }}
          <v-icon right>{{ mdiMenuDown }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in privateElements" :key="index">
          <v-list-item-title @click="selectItem(item)">{{
            item
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { mdiPlus, mdiMenuDown } from "@mdi/js";
export default {
  data() {
    return {
      mdiPlus,
      mdiMenuDown,
      defaultItem: {
        name: ""
      },
      editedItem: {
        name: ""
      }
    };
  },

  methods: {
    ...mapMutations("micropageForm", ["addElement"]),

    selectItem(item) {
      this.editedItem.name = item;
      this.addElement(this.editedItem);
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  },

  computed: {
    ...mapGetters("micropageForm", ["privateElements"]),

    hasPrivateElements() {
      return this.privateElements.length > 0;
    }
  }
};
</script>
