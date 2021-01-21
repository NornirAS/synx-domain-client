<template>
  <input-card>
    <div slot="title">Service Schema*{{ getLinks }}</div>
    <div slot="subtitle">
      Add key elements to your service schema.
    </div>
    <v-textarea
      v-model="schema"
      @blur="addSchema"
      :rules="schemaRules"
      :counter="1024"
      name="schema"
      label="Type or paste service schema"
      type="text"
      error-count="1"
      slot="action"
      required
      outlined
      dense
    ></v-textarea>
  </input-card>
</template>

<script>
import _ from "lodash";
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      schema: "",
      regExp: "",
      test: "",
      schemaRules: [
        v => !!v || "Schema is required",
        v =>
          (v && v.length) <= 1024 || "Schema must be maximum 1024 characters",
        v =>
          (v && this.schemaContainOnlyXml) ||
          "You need to provide valid XML schema",
        v =>
          (v && this.isElementsMatch) ||
          "Schema open and closing tags must match"
      ]
    };
  },
  methods: {
    addSchema() {
      this.$store.commit("serviceFormModule/addSchema", this.shema);
    }
  },
  computed: {
    matchXml() {
      return this.schema.match(/<(.*?)>(.*?)<\/(.*?)>|\n/g);
    },
    schemaContainOnlyXml() {
      if (this.matchXml) {
        return this.matchXml.join("") === this.schema;
      } else {
        return false;
      }
    },
    mapXmlByTag() {
      if (this.matchXml) {
        return this.schema.match(/<(.*?)>(.*?)<\/(.*?)>/g).map(str => {
          return str.replace(/\//g, "").match(/(?<=<)(.*?)(?=>)/g);
        });
      } else {
        return [];
      }
    },
    mergeMapedArrays() {
      return _.flattenDeep(this.mapXmlByTag);
    },
    removeDuplicates() {
      return _.sortedUniq(this.mergeMapedArrays);
    },
    isElementsMatch() {
      if (this.matchXml) {
        console.log(this.mergeMapedArrays, this.removeDuplicates);
        return this.mergeMapedArrays.length / 2 === this.removeDuplicates.length
          ? true
          : false;
      } else {
        return false;
      }
    },
    getLinks() {
      if (this.matchXml) {
        return this.matchXml.map(str => {
          return str.match(/(?<=<(.*?)>)(.*?)(?=<(.*?)>)/g);
        });
      } else {
        return "";
      }
    }
  },
  components: {
    InputCard
  }
};
</script>
