<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Enter you service schema definition using metadata only - Only single
      elements. Nested XML structure is not supported in this version.
    </div>
    <v-textarea
      v-model="serviceSchema"
      @blur="addSchema(serviceSchema)"
      :rules="schemaRules"
      :counter="maxLen"
      name="schema"
      label="Enter service schema"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { requiredRule, lengthRule } from "../../../input-rules";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Service Schema",
      maxLen: 1024,
      serviceSchema: "<RTW>\n</RTW>",
      schemaRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen),
        v => (v && this.hasRtwTags) || "You need to have <RTW></RTW>",
        v =>
          (v && this.schemaHasValidXmlElements && this.isValidSchema) ||
          "You need to provide valid XML schema between <RTW></RTW>",
        v =>
          (v && this.matchOpenClosingTags) ||
          "Open and closing tags must match",
        v =>
          (v && this.noDuplicateElement) || "Schema contain duplicate element",
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
    ...mapMutations("serviceForm", ["addSchema", "addIsValidLinks"])
  },
  computed: {
    ...mapState("serviceForm", ["schema"]),

    schemaString() {
      return this.serviceSchema.replace(/\n/g, "").toLowerCase();
    },

    hasRtwTags() {
      return (
        this.schemaString.includes("<rtw>") &&
        this.schemaString.includes("</rtw>")
      );
    },

    validSchema() {
      return this.schemaString.match(/<rtw>(.*?)<\/rtw>/gi);
    },

    isValidSchema() {
      if (this.validSchema) {
        return this.schemaString === this.validSchema.join("");
      } else {
        return false;
      }
    },

    contentInsideRtwTags() {
      if (this.validSchema) {
        return this.validSchema.join("").replace(/<\/?RTW>/gi, "");
      } else {
        return null;
      }
    },

    schemaElements() {
      if (this.contentInsideRtwTags !== null) {
        return this.contentInsideRtwTags.match(/<(.*?)>(.*?)<\/(.*?)>/g);
      } else {
        return null;
      }
    },

    schemaElementsTags() {
      if (this.schemaElements !== null) {
        return this.schemaElements.map(element => {
          return element.match(/<\/?(.*?)>/gi);
        });
      } else {
        return null;
      }
    },

    schemaElementsTagNames() {
      if (this.schemaElementsTags !== null) {
        return this.schemaElementsTags.map(item => {
          item[0] = item[0].replace(/\/|<|>/g, "").toLowerCase();
          item[1] = item[1].replace(/\/|<|>/g, "").toLowerCase();
          return item;
        });
      } else {
        return null;
      }
    },

    matchOpenClosingTags() {
      if (this.schemaElementsTagNames !== null) {
        return this.schemaElementsTagNames.every(item => item[0] === item[1]);
      } else {
        return true;
      }
    },

    schemaHasValidXmlElements() {
      if (this.schemaElements !== null && this.contentInsideRtwTags !== null) {
        return this.contentInsideRtwTags === this.schemaElements.join("");
      } else {
        return false;
      }
    },

    schemaElementsTagsNamesSingleArray() {
      if (this.schemaHasValidXmlElements) {
        return [].concat.apply([], this.schemaElementsTagNames);
      } else {
        return null;
      }
    },

    uniqSchemaElementsNames() {
      if (this.schemaElementsTagsNamesSingleArray !== null) {
        return this.schemaElementsTagsNamesSingleArray.filter(
          (item, index, array) => array.indexOf(item) === index
        );
      } else {
        return null;
      }
    },

    noDuplicateElement() {
      if (this.uniqSchemaElementsNames !== null) {
        return (
          this.schemaElementsTagsNamesSingleArray.length / 2 ===
          this.uniqSchemaElementsNames.length
        );
      } else {
        return true;
      }
    },

    getLinksFromXml() {
      if (this.schemaElements !== null) {
        return this.schemaElements
          .map(item => {
            return item.replace(/<\/?(.*?)>/g, "");
          })
          .join("");
      } else {
        return null;
      }
    },

    validLinks() {
      if (this.getLinksFromXml !== null && this.getLinksFromXml !== "") {
        return this.getLinksFromXml.match(
          /@([a-zA-Z0-9-_~]+?)(?=\/)\/([a-zA-Z0-9-_~]+?)(?=#)#([a-zA-Z0-9-_~]+?)@/g
        );
      } else {
        return null;
      }
    },

    isValidLinks() {
      if (this.validLinks !== null) {
        return this.getLinksFromXml.length === this.validLinks.join("").length;
      } else if (this.getLinksFromXml === "") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    isValidLinks(newValue) {
      this.addIsValidLinks(newValue);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
