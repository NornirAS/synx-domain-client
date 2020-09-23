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
        <tr v-for="(item, index) in schemas" :key="item.name">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td><Dialog /></td>
          <td>{{ item.linkingFrom }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Dialog from "./DialogForXML.vue";
export default {
  data() {
    return {
      colorBlue: "#27AAE1",
      schemas: [
        {
          name: "light",
          linkingTo: "Add Link",
          linkingFrom: "View Links"
        },
        {
          name: "sun",
          linkingTo: "Add Link",
          linkingFrom: "View Links"
        }
      ]
    };
  },
  components: {
    Dialog
  }
};
</script>
