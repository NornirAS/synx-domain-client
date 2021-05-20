<template>
  <form-input-card>
    <div slot="title">Schema Description</div>
    <div slot="subtitle">
      Enter a description of your data structure that you want to be linkable.
      Please describe each data element and what's behind the data source
      generator.
    </div>
    <v-textarea
      v-model="description"
      @blur="addSchemaDescription(description)"
      :rules="descriptionRules"
      :counter="maxLen"
      name="description"
      label="Describe your public schema"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-textarea>
    <schema-details slot="helper" class="mb-6"></schema-details>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { requiredRule, lengthRule } from "../../../../input-rules";
import FormInputCard from "../../../globals/FormInputCard";
import SchemaDetails from "./SchemaDetails";
export default {
  data() {
    return {
      title: "Schema Description",
      maxLen: 512,
      description: "",
      descriptionRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen)
      ]
    };
  },
  methods: {
    ...mapMutations("micropageForm", ["addSchemaDescription"])
  },
  computed: {
    ...mapState("micropageForm", ["schemaOverview"])
  },
  watch: {
    schemaOverview(newValue) {
      this.description = newValue.description;
    }
  },
  components: {
    FormInputCard,
    SchemaDetails
  }
};
</script>
