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
      <tbody>
        <tr v-for="(item, index) in serviceXML" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td><Dialog :index="getIndex(index)" /></td>
          <td>{{ item.linkingFrom }}</td>
        </tr>
      </tbody>
    </template>
    <p></p>
  </v-simple-table>
</template>

<script>
import Dialog from "./DialogForXML.vue";
export default {
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
    }
  }
};
</script>
