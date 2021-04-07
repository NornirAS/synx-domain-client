<template>
  <form-input-card>
    <div slot="title">Schema Description</div>
    <div slot="subtitle">
      Enter data elements from you schema and explain to the public what data
      your schema is offering. Use the format "#elementname" followed by
      "description", this will automatically generate valid linking path to
      element when you publish the description.
    </div>
    <v-textarea
      v-model="description"
      @blur="addSchemaDescription(description)"
      :rules="descriptionRules"
      :counter="512"
      name="description"
      label="Describe your public schema"
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
      description: "",
      descriptionRules: [
        v => !!v || "Description is required",
        v =>
          (v && v.length) <= 512 || "Description must be maximum 512 character"
      ]
    };
  },
  methods: {
    ...mapMutations("micropageForm", ["addSchemaDescription"])
  },
  computed: {
    ...mapState("micropageForm", ["schemaDescription"])
  },
  watch: {
    schemaDescription(newValue) {
      this.description = newValue;
    }
  },
  components: {
    FormInputCard
  }
};
</script>
