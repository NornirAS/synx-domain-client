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
          {{ linkName }}
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
              <v-btn
                :color="colorGreen"
                fab
                @click="(dialog = false), (isLink = true), addLink()"
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
export default {
  props: ["index", "title"],
  data() {
    return {
      linkName: "Add Link",
      isLink: false,
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
  methods: {
    addLink() {
      if (this.title === "Service XML") {
        this.$store.commit("serviceXMLAddLink", {
          name: this.serviceXML[this.index].name,
          linkTo: {
            domain: this.linkTo.domain,
            service: this.linkTo.service,
            variable: this.linkTo.variable
          }
        });
      } else {
        this.$store.commit("commandXMLAddLink", {
          name: this.commandXML[this.index].name,
          linkTo: {
            domain: this.linkTo.domain,
            service: this.linkTo.service,
            variable: this.linkTo.variable
          }
        });
      }
    },
    removeLink() {
      if (this.title === "Service XML") {
        this.$store.commit("serviceXMLAddLink", {
          name: this.serviceXML[this.index].name,
          linkTo: {}
        });
        this.linkTo = {};
        this.isLink = false;
        this.dialog = false;
      } else {
        this.$store.commit("commandXMLAddLink", {
          name: this.commandXML[this.index].name,
          linkTo: {}
        });
        this.linkTo = {};
        this.isLink = false;
        this.dialog = false;
      }
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
    },
    commandXML() {
      return this.$store.state.commandXML;
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
