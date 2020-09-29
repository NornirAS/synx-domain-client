<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Schema</th>
          <th class="text-left">Linking to</th>
          <th class="text-left">Linking from</th>
        </tr>
      </thead>
      <tbody v-if="title === 'Service XML'">
        <tr v-for="(item, index) in serviceXML" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td><Dialog :index="getIndex(index)" :title="title" /></td>
          <td>{{ item.linkingFrom }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in commandXML" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td><Dialog :index="getIndex(index)" :title="title" /></td>
          <td>{{ item.linkingFrom }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Dialog from "./DialogForXML.vue";
export default {
  props: ["title"],
  data() {
    return {
      colorBlue: "#27AAE1"
    };
  },
  components: {
    Dialog
  },
  methods: {
    getIndex(index) {
      return index;
    }
  },
  computed: {
    serviceXML() {
      return this.$store.state.serviceXML;
    },
    commandXML() {
      return this.$store.state.commandXML;
    }
  }
};
</script>
