<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :style="btnStyle"
        dark
        v-bind="attrs"
        v-on="on"
        x-small
        outlined
        rounded
      >
        Add Instances
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Add instances
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model.number="instancesToAdd"
          type="number"
          error-count="2"
          slot="action"
          :max="availableInstances"
          required
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      {{ availableInstances }}
      <v-card-actions>
        <v-btn @click="dialog = false" :color="colorGrey" small rounded dark>
          Cances
        </v-btn>
        <v-btn @click="dialog = false" :color="colorBlue" small rounded dark>
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      dialog: false,
      instancesToAdd: "",
      instancesLimit: 1000,
      btnStyle: {
        color: "#58595B",
        margin: "0.3em 1em 0.3em 0"
      },
      colorBlue: "#27AAE1",
      colorGrey: "#404B5F",
      instancesRules: [
        v => !!v || "Required",
        v => v > 0 || "You should Add at least one instance",
        v => /^[\d]+$/.test(v) || "Only numbers are allowed"
      ]
    };
  }
};
</script>
