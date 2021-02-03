<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="(item, index) in links" :key="index">
          <td>{{ item.link }}</td>
          <td>
            <v-switch
              class="float-right"
              v-model="item.active"
              :label="item.active === true ? 'Yes' : 'No'"
            ></v-switch>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { link: "narva/blabla", active: true },
        { link: "tartu/blabla", active: false }
      ]
    };
  }
};
</script>
