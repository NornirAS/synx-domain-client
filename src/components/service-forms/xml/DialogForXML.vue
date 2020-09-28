<template>
  <div class="text-left">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :color="colorBlue" dark v-bind="attrs" v-on="on" xSmall text>
          {{ linkName }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          Add Link
        </v-card-title>
        <v-card-actions>
          <v-row style="padding: 0 1em">
            <v-col xs="3">
              <v-text-field
                label="Domain"
                single-line
                dense
                outlined
                hide-details
                v-model="linkTo.domain"
              ></v-text-field>
            </v-col>
            <p>/</p>
            <v-col xs="3">
              <v-text-field
                label="Service"
                single-line
                dense
                outlined
                hide-details
                v-model="linkTo.service"
              ></v-text-field>
            </v-col>
            <p>#</p>
            <v-col xs="3">
              <v-text-field
                label="Variable"
                single-line
                dense
                outlined
                hide-details
                v-model="linkTo.variable"
              ></v-text-field>
            </v-col>
            <v-col xs="3">
              <v-row class="justify-space-around">
                <v-btn
                  :color="colorGreen"
                  fab
                  @click="(dialog = false), addLinking()"
                  small
                >
                  <v-icon>{{ mdiCheck }}</v-icon>
                </v-btn>
                <v-btn color="default" fab @click="dialog = false" small>
                  <v-icon>{{ mdiClose }}</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCheck, mdiClose } from "@mdi/js";
export default {
  props: ["index"],
  data() {
    return {
      linkName: "Add Link",
      linkTo: {
        domain: "",
        service: "",
        variable: ""
      },
      mdiCheck,
      mdiClose,
      colorBlue: "#27AAE1",
      colorGreen: "#71B663",
      dialog: false
    };
  },
  methods: {
    addLinking() {
      this.$store.commit("setAge", {
        name: this.serviceXML[this.index].name,
        linkTo: this.linkingString()
      });
    },
    linkingString() {
      return (
        this.linkTo.domain +
        "/" +
        this.linkTo.service +
        "#" +
        this.linkTo.variable
      );
    }
  },
  computed: {
    serviceXML() {
      return this.$store.state.serviceXML;
    }
  }
};
</script>

<style scoped>
p {
  padding-top: 1.4em;
}
.v-card {
  width: 100%;
  padding: 0;
}
.v-dialog > .v-card > .v-card__title {
  color: white;
  background-color: #27aae1;
  font-size: 20px;
}
</style>
