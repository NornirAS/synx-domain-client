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
        v => (v && this.hasRtwTags) || "You need to have <RTW></RTW>",
        v =>
          (v &&
            this.schemaHasValidXmlElements &&
            this.contentProvidedInsideRtwTags) ||
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
    ...mapMutations("serviceFormModule", ["addSchema", "addIsValidLinks"])
  },
  computed: {
    ...mapState("serviceFormModule", ["schema"]),
    serviceSchemaSingleLineString() {
      return this.serviceSchema.replace(/\n/g, "");
    },
    hasOpenRtwTag() {
      return this.serviceSchemaSingleLineString.match(/<rtw>/gi) ? true : false;
    },
    hasClosingRtwTag() {
      return this.serviceSchemaSingleLineString.match(/<\/rtw>/gi)
        ? true
        : false;
    },
    hasRtwTags() {
      if (this.hasOpenRtwTag && this.hasClosingRtwTag) {
        return this.hasOpenRtwTag === this.hasClosingRtwTag;
      } else {
        return false;
      }
    },
    schemaWithRtwTags() {
      if (this.hasRtwTags) {
        return this.serviceSchemaSingleLineString.match(/<rtw>(.*?)<\/rtw>/gi);
      } else {
        return null;
      }
    },
    contentProvidedInsideRtwTags() {
      if (this.schemaWithRtwTags !== null) {
        return (
          this.serviceSchemaSingleLineString === this.schemaWithRtwTags.join("")
        );
      } else {
        return false;
      }
    },
    contentInsideRtwTags() {
      if (this.schemaWithRtwTags !== null) {
        return this.schemaWithRtwTags.join("").replace(/<\/?RTW>/gi, "");
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
          (item, pos, array) => array.indexOf(item) === pos
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
      if (this.getLinksFromXml !== null) {
        return this.getLinksFromXml
          .match(
            /@([a-zA-Z0-9_]+?)(?=\/)\/([a-zA-Z0-9_]+?)(?=#)#([a-zA-Z0-9_]+?)@/g
          )
          .join("");
      } else {
        return null;
      }
    },
    isValidLinks() {
      if (this.validLinks !== null) {
        return this.getLinksFromXml.length === this.validLinks.length;
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
