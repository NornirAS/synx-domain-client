<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Schema</th>
          <th class="text-left">Linking to</th>
          <th class="text-center">Remove Schema</th>
        </tr>
      </thead>
      <tbody v-if="title === 'Service XML'">
        <tr v-for="(item, index) in serviceXML" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td><Dialog :index="getIndex(index)" :title="title" /></td>
          <td class="text-center">
            <v-btn @click="removeSchema(index)" :color="colorRed" icon x-small>
              <v-icon>{{ mdiDelete }}</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in commandXML" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td><Dialog :index="getIndex(index)" :title="title" /></td>
          <td class="text-center">
            <v-btn @click="removeSchema(index)" :color="colorRed" icon x-small>
              <v-icon>{{ mdiDelete }}</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import Dialog from "./DialogForXML.vue";
export default {
  props: ["title"],
  data() {
    return {
      mdiDelete,
      colorRed: "#FF6666",
      colorBlue: "#27AAE1"
    };
  },
  components: {
    Dialog
  },
  methods: {
    getIndex(index) {
      return index;
    },
    removeSchema(index) {
      if (this.title === "Service XML") {
        this.$store.commit("serviceXMLRemoveSchema", index);
      } else {
        this.$store.commit("commandXMLRemoveSchema", index);
      }
    }
  },
  computed: {
    serviceXML() {
      return this.$store.state.serviceForm.serviceXML;
    },
    commandXML() {
      return this.$store.state.serviceForm.commandXML;
    }
  }
};
</script>
