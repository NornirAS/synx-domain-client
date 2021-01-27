<template>
  <input-card>
    <div slot="title">Service Schema*</div>
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
      schema: "<rtw>\n</rtw>",
      schemaRules: [
        v => !!v || "Schema is required",
        v =>
          (v && v.length) <= 1024 || "Schema must be maximum 1024 characters",
        v =>
          (v && this.schemaContainsOnlyXml) ||
          "You need to provide valid XML schema between <rtw></rtw>",
        v =>
          (v && this.isElementsMatch) ||
          "Schema open and closing tags must match",
        v =>
          (v && this.isValidLinks) ||
          "You must provide valid links in @domain/service#ghost@ format"
      ]
    };
  },
  mounted() {
    this.schema = this.serviceSchema;
  },
  methods: {
    addSchema() {
      this.$store.commit("serviceFormModule/addSchema", this.schema);
    }
  },
  computed: {
    serviceSchema() {
      return this.$store.state.serviceFormModule.schema;
    },
    removeNewLine() {
      return this.schema.replace(/\n/g, "");
    },
    matchXml() {
      return this.removeNewLine.match(
        /(?<=<rtw>)<(.*?)>(.*?)<\/(.*?)>(?=<\/rtw>)/g
      );
    },
    containsRtwTag() {
      return this.removeNewLine.match(/<\/?rtw>/g) ? true : false;
    },
    schemaRemoveRtwTag() {
      return this.removeNewLine.replace(/<\/?rtw>/gi, "");
    },
    schemaContainsOnlyXml() {
      if (this.matchXml) {
        return this.matchXml.join("") === this.schemaRemoveRtwTag;
      } else {
        return false;
      }
    },
    getXmlTagNames() {
      if (this.schemaContainsOnlyXml) {
        return this.removeNewLine.match(/<\/?(.*?)>/g).map(str => {
          return str.replace(/\//g, "").match(/(?<=<)(.*?)(?=>)/g);
        });
      } else {
        return [];
      }
    },
    mergeXmlTagNamesInSingleArray() {
      return _.flattenDeep(this.getXmlTagNames);
    },
    removeDuplicateNames() {
      return _.uniq(this.mergeXmlTagNamesInSingleArray);
    },
    isElementsMatch() {
      if (this.schemaContainsOnlyXml) {
        return this.mergeXmlTagNamesInSingleArray.length / 2 ===
          this.removeDuplicateNames.length
          ? true
          : false;
      } else {
        return false;
      }
    },
    getLinksFromXml() {
      if (this.schemaContainsOnlyXml) {
        return this.removeNewLine.match(/(?<=<(.*?)>)(.*?)(?=<(.*?)>)/g);
      } else {
        return false;
      }
    },
    isLinks() {
      if (this.getLinksFromXml) {
        return this.getLinksFromXml.join("") !== "";
      } else {
        return false;
      }
    },
    validateLinks() {
      if (this.isLinks) {
        return this.getLinksFromXml
          .join("")
          .match(
            /@([a-zA-Z0-9_]+?)(?=\/)\/([a-zA-Z0-9_]+?)(?=#)#([a-zA-Z0-9_]+?)@/g ||
              false
          );
      } else {
        return false;
      }
    },
    isValidLinks() {
      if (this.validateLinks) {
        const notValidLinksString = this.getLinksFromXml.join("");
        const validLinksString = this.validateLinks.join("");
        return notValidLinksString.length === validLinksString.length;
      } else if (!this.isLinks) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    validateLinks(newValue) {
      this.$store.commit("serviceFormModule/isValidLinks", newValue);
    }
  },
  components: {
    InputCard
  }
};
</script>
