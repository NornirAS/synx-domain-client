<template>
  <input-card>
    <div slot="title">Schema Description</div>
    <div slot="subtitle">
      Explain what you service do.
    </div>
    <v-textarea
      v-model="description"
      @blur="addSchemaDescription"
      :rules="schemaDescriptionRules"
      :counter="254"
      name="schema-description"
      label="Schema Description"
      type="text"
      error-count="2"
      slot="action"
      required
      outlined
      dense
    ></v-textarea>
  </input-card>
</template>

<script>
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      description: "",
      descriptionRules: [
        v => !!v || "Schema description is required",
        v =>
          (v && v.length) <= 254 ||
          "Schema description must be maximum 254 character"
      ]
    };
  },
  methods: {
    addSchemaDescription() {
      this.$store.commit(
        "micropageFormModule/addSchemaDescription",
        this.description
      );
    }
  },
  components: {
    InputCard
  }
};
</script>
