<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="300">
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
                  :rules="formRules"
                  :counter="15"
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
                  :rules="formRules"
                  :counter="15"
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
                  :rules="formRules"
                  :counter="15"
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
              <v-col>
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
                  Add Link
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-actions>

        <v-row>
          <v-col align="center" style="padding-top: 0">
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
  props: ["index"],
  data() {
    return {
      mdiCheck,
      mdiClose,
      mdiDelete,
      valid: false,
      isLink: false,
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
      formRules: [
        v => !!v || "Name is required",
        v => (v && v.length) <= 15 || "Name must be maximum 15 character",
        v =>
          /^[A-Za-z\d]+$/.test(v) ||
          "Only alphabet characters and numbers are allowed"
      ],
      colorBlue: "#27AAE1",
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
      this.$store.commit("serviceFormModule/serviceSchemaAddLink", {
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
      this.$store.commit("serviceFormModule/serviceSchemaRemoveLink", {
        tagName: this.serviceSchema.tagName
      });
      this.linkTo = {};
      this.isLink = false;
      this.dialog = false;
    },
    submitLinkForm() {
      if (this.$refs.linkForm.validate()) {
        this.addLink();
        this.$refs.linkForm.reset();
      }
    }
  },
  computed: {
    serviceFormModule() {
      return this.$store.state.serviceFormModule;
    },
    serviceSchema() {
      return this.serviceFormModule.serviceSchema[this.index];
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
