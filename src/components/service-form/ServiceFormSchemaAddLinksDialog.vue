<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="colorLightGrey"
          dark
          v-bind="attrs"
          v-on="on"
          x-small
          rounded
        >
          {{ activatorBtnName }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          {{ dialogTitle }}
        </v-card-title>
        <v-card-actions>
          <v-form
            ref="linkForm"
            v-model="valid"
            @submit.prevent="submitLinkForm"
            lazy-validation
          >
            <v-row style="padding: 0 1em">
              <v-col cols="12">
                <v-text-field
                  v-model="linkTo.domain"
                  :rules="domainRules"
                  :counter="64"
                  label="Domain"
                  form="service-form"
                  name="domain"
                  type="text"
                  error-count="2"
                  required
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="linkTo.service"
                  :rules="serviceRules"
                  :counter="64"
                  label="Service"
                  form="service-form"
                  name="service"
                  type="text"
                  error-count="2"
                  required
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="linkTo.variable"
                  :rules="variableRules"
                  :counter="32"
                  label="Variable"
                  form="service-form"
                  name="variable"
                  type="text"
                  error-count="2"
                  required
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="text-capitalize"
                  @click="dialog = false"
                  :style="cancelBtnStyle"
                  dark
                  rounded
                  small
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="text-capitalize"
                  :style="actionBtnStyle"
                  type="submit"
                  dark
                  rounded
                  small
                >
                  {{ dialogBtnName }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-actions>
        <v-row v-if="link">
          <v-col align="center" style="padding-top: 0">
            <v-btn @click="removeLink()" :color="colorRed" text small>
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
  props: ["elementIndex", "link", "linkIndex"],
  data() {
    return {
      mdiCheck,
      mdiClose,
      mdiDelete,
      valid: false,
      linkTo: {
        domain: "",
        service: "",
        variable: ""
      },
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right"
      },
      cancelBtnStyle: {
        backgroundColor: "#404B5F"
      },
      domainRules: [
        v => !!v || "Domain is required",
        v => (v && v.length) <= 64 || "Domain must be maximum 64 character",
        v =>
          /^[A-Za-z\d]+$/.test(v) ||
          "Only alphabet characters and numbers are allowed"
      ],
      serviceRules: [
        v => !!v || "Service is required",
        v => (v && v.length) <= 64 || "Service must be maximum 64 character",
        v =>
          /^[A-Za-z\d]+$/.test(v) ||
          "Only alphabet characters and numbers are allowed"
      ],
      variableRules: [
        v => !!v || "Variable is required",
        v => (v && v.length) <= 32 || "Variable must be maximum 32 character",
        v =>
          /^[A-Za-z\d]+$/.test(v) ||
          "Only alphabet characters and numbers are allowed"
      ],
      colorLightGrey: "#404B5F",
      colorRed: "#FF6666",
      dialog: false
    };
  },
  created() {
    if (this.link) {
      this.linkTo.domain = this.link.domain;
      this.linkTo.service = this.link.service;
      this.linkTo.variable = this.link.variable;
    }
  },
  methods: {
    addLink() {
      this.$store.commit("serviceFormModule/serviceSchemaAddLink", {
        tagName: this.serviceSchema.tagName,
        linkTo: {
          domain: this.linkTo.domain,
          service: this.linkTo.service,
          variable: this.linkTo.variable
        }
      });
      this.dialog = false;
    },
    removeLink() {
      this.$store.commit("serviceFormModule/serviceSchemaRemoveLink", {
        tagName: this.serviceSchema.tagName,
        index: this.linkIndex
      });
      this.dialog = false;
    },
    updateLink() {
      this.$store.commit("serviceFormModule/serviceSchemaUpdateLink", {
        tagName: this.serviceSchema.tagName,
        linkTo: {
          domain: this.linkTo.domain,
          service: this.linkTo.service,
          variable: this.linkTo.variable
        },
        index: this.linkIndex
      });
      this.dialog = false;
    },
    submitLinkForm() {
      this.$refs.linkForm.validate();
      if (this.$refs.linkForm.validate()) {
        if (this.link) {
          this.updateLink();
        } else {
          this.addLink();
          this.$refs.linkForm.reset();
        }
      }
    }
  },
  computed: {
    serviceSchema() {
      return this.$store.state.serviceFormModule.serviceSchema[
        this.elementIndex
      ];
    },
    dialogTitle() {
      return this.link ? "Update Link" : "Add Link";
    },
    dialogBtnName() {
      return this.link ? "Update" : "Add";
    },
    activatorBtnName() {
      return this.link ? "Update" : "Add";
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
