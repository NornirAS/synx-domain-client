<template>
  <v-simple-table slot="result" dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th :style="successStyle" class="text-left">
            Congratulations! https://DOMAIN.cioty.com is available
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :style="resultStyle">DOMAIN.cioty.com</td>
          <td>
            <v-btn :color="colorGreen" small rounded dark>Select</v-btn>
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
      successStyle: {
        color: "#71B663",
        fontSize: "20px",
        fontWeight: "500"
      },
      resultStyle: {
        color: "#58595B",
        fontSize: "16px"
      },
      colorGreen: "#71B663"
    };
  }
};
</script>
