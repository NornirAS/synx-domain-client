<template>
  <div class="text-left">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="isLink"
          :color="colorBlue"
          style="padding-left: 0"
          dark
          v-bind="attrs"
          v-on="on"
          xSmall
          text
        >
          {{ linkingString() }}
        </v-btn>
        <v-btn
          v-else
          :color="colorBlue"
          style="padding-left: 0"
          dark
          v-bind="attrs"
          v-on="on"
          xSmall
          text
        >
          Add Link
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          Add Link
        </v-card-title>
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
              <v-btn :color="colorGreen" fab @click="addLink()" small>
                <v-icon>{{ mdiCheck }}</v-icon>
              </v-btn>
              <v-btn color="default" fab @click="dialog = false" small>
                <v-icon>{{ mdiClose }}</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="right" style="padding-top: 0">
            <v-btn
              v-if="isLink"
              @click="removeLink()"
              :color="colorRed"
              text
              small
            >
              <v-icon>{{ mdiDelete }}</v-icon>
              Remove Link
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCheck, mdiClose, mdiDelete } from "@mdi/js";
import _ from "underscore";
export default {
  props: ["index", "title"],
  data() {
    return {
      isLink: null,
      linkTo: {
        domain: "",
        service: "",
        variable: ""
      },
      mdiCheck,
      mdiClose,
      mdiDelete,
      colorBlue: "#27AAE1",
      colorGreen: "#71B663",
      colorRed: "#FF6666",
      dialog: false
    };
  },
  created() {
    const links = this.serviceSchema[this.index].linkTo;
    this.isLink = !_.isEmpty(links);
    if (!_.isEmpty(links)) {
      this.linkTo.domain = links.domain;
      this.linkTo.service = links.service;
      this.linkTo.variable = links.variable;
    }
  },
  methods: {
    addLink() {
      this.$store.commit("serviceSchemaAddLink", {
        tagName: this.serviceSchema[this.index].tagName,
        linkTo: {
          domain: this.linkTo.domain,
          service: this.linkTo.service,
          variable: this.linkTo.variable
        }
      });
      this.isLink = true;
      this.dialog = false;
    },
    removeLink() {
      this.$store.commit("serviceSchemaAddLink", {
        tagName: this.serviceSchema[this.index].tagName,
        linkTo: {}
      });
      this.linkTo = {};
      this.isLink = false;
      this.dialog = false;
    },
    linkingString() {
      return (
        this.serviceSchema[this.index].linkTo.domain +
        "/" +
        this.serviceSchema[this.index].linkTo.service +
        "#" +
        this.serviceSchema[this.index].linkTo.variable
      );
    }
  },
  computed: {
    serviceSchema() {
      return this.$store.state.serviceForm.serviceSchema;
    },
    serviceTest() {
      return this.$store.state.serviceForm.serviceSchema[this.index].linkTo
        .domain;
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
