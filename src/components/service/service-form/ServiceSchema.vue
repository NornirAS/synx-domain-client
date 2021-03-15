<template>
  <form-input-card>
    <div slot="title">Service Schema</div>
    <div slot="subtitle">
      Enter you service schema definition using metadata only - Only single
      elements. Nested XML structure is not supported in this version.
    </div>
    <v-textarea
      v-model="serviceSchema"
      @blur="addSchema(serviceSchema)"
      :rules="schemaRules"
      :counter="1024"
      name="schema"
      label="Enter service schema"
      type="text"
      error-count="1"
      slot="action"
      required
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceSchema: "<RTW>\n</RTW>",
      schemaRules: [
        v => !!v || "Schema is required",
        v =>
          (v && v.length) <= 1024 || "Schema must be maximum 1024 characters",
        v =>
          (v && this.schemaContainsOnlyXml) ||
          "You need to provide valid XML schema between <RTW></RTW>",
        v =>
          (v && this.isElementsMatch) ||
          "Schema open and closing tags must match",
        v =>
          (v && this.isValidLinks) ||
          "You must provide valid links in @domain/service#elementName@ format"
      ]
    };
  },
  mounted() {
    this.serviceSchema = this.schema;
  },
  methods: {
    ...mapMutations("serviceFormModule", ["addSchema", "addIsValidLinks"])
  },
  computed: {
    ...mapState("serviceFormModule", ["schema"]),
    removeNewLine() {
      return this.serviceSchema.replace(/\n/g, "");
    },
    matchXml() {
      return this.removeNewLine.slice(5, -6);
    },
    containsRtwTag() {
      return this.removeNewLine.match(/<\/?RTW>/g) ? true : false;
    },
    schemaRemoveRtwTag() {
      return this.removeNewLine.replace(/<\/?RTW>/gi, "");
    },
    schemaContainsOnlyXml() {
      if (this.matchXml) {
        return this.matchXml === this.schemaRemoveRtwTag;
      } else {
        return false;
      }
    },
    getXmlTagNames() {
      if (this.schemaContainsOnlyXml) {
        return this.removeNewLine.match(/<\/?(.*?)>/g).map(str => {
          return str.replace(/\//g, "").slice(1, -1);
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
        return this.removeNewLine.match(/@(.*?)@/g);
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
      this.addIsValidLinks(newValue);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
