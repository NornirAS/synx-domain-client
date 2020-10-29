<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Schema</th>
          <th v-if="title === 'Service Schema'" class="text-left">
            Linking to
          </th>
          <th class="text-center">Remove Schema</th>
        </tr>
      </thead>
      <tbody v-if="title === 'Service Schema'">
        <tr v-for="(item, index) in serviceSchema" :key="index">
          <td>{{ index }}</td>
          <td>{{ item.tagName }}</td>
          <td>
            <Dialog :index="index" :title="title" :linkTest="item.linkTo" />
          </td>
          <td class="text-center">
            <v-btn @click="removeSchema(index)" :color="colorRed" icon x-small>
              <v-icon>{{ mdiDelete }}</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in commandSchema" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item }}</td>
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
import Dialog from "./DialogForSchema.vue";
export default {
  props: ["title"],
  data() {
    return {
      mdiDelete,
      colorRed: "#FF6666",
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    removeSchema(index) {
      if (this.title === "Service Schema") {
        this.$store.commit("serviceModule/removeServiceSchema", index);
      } else {
        this.$store.commit("serviceModule/removeCommandSchema", index);
      }
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    serviceSchema() {
      return this.serviceModule.serviceForm.serviceSchema;
    },
    commandSchema() {
      return this.serviceModule.serviceForm.commandSchema;
    }
  },
  components: {
    Dialog
  }
};
</script>
