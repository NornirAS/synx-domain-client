<template>
  <div class="d-flex">
    <v-text-field
      v-model="name"
      class="shrink mr-4"
      label="Element"
      outlined
      dense
    ></v-text-field>
    <v-textarea
      v-model="description"
      class="grow"
      label="Element Description"
      rows="1"
      outlined
      auto-grow
      dense
    ></v-textarea>
    <v-btn v-if="element" @click="removeElement(index)" color="error" icon>
      <v-icon>{{ mdiTrashCanOutline }}</v-icon>
    </v-btn>
    <v-btn
      v-else
      @click="
        addElement({ name, description }), (name = ''), (description = '')
      "
      color="accent"
      icon
    >
      <v-icon>{{ mdiPlus }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mdiTrashCanOutline, mdiPlus } from "@mdi/js";
export default {
  props: ["element", "index"],
  data() {
    return {
      mdiTrashCanOutline,
      mdiPlus,
      name: "",
      description: ""
    };
  },
  mounted() {
    if (this.element) {
      this.name = this.element.name;
      this.description = this.element.description;
    }
  },
  methods: {
    ...mapMutations("micropageForm", ["addElement", "removeElement"])
  }
};
</script>
