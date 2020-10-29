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
          {{ linkingString }}
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
  props: ["index", "title", "linkTest"],
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
    const links = this.serviceSchema.linkTo;
    this.isLink = !_.isEmpty(links);
    if (!_.isEmpty(links)) {
      this.linkTo.domain = links.domain;
      this.linkTo.service = links.service;
      this.linkTo.variable = links.variable;
    }
  },
  methods: {
    addLink() {
      this.$store.commit("serviceModule/serviceSchemaAddLink", {
        tagName: this.serviceSchema.tagName,
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
      this.$store.commit("serviceModule/serviceSchemaRemoveLink", {
        tagName: this.serviceSchema.tagName,
        linkTo: {}
      });
      this.linkTo = {};
      this.isLink = false;
      this.dialog = false;
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    serviceSchema() {
      return this.serviceModule.serviceForm.serviceSchema[this.index];
    },
    checkLinks() {
      return this.serviceSchema.linkTo;
    },
    linkingString() {
      return (
        this.serviceSchema.linkTo.domain +
        "/" +
        this.serviceSchema.linkTo.service +
        "#" +
        this.serviceSchema.linkTo.variable
      );
    }
  },
  watch: {
    checkLinks: {
      handler(nv) {
        this.isLink = !_.isEmpty(nv);
      },
      deep: true
    }
  },
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
