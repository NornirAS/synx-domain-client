<template>
  <input-card>
    <div slot="title">Description</div>
    <div slot="subtitle">
      Service description that will be visible for everyone.
    </div>
    <v-textarea
      v-model="description"
      @blur="addDescription"
      :rules="descriptionRules"
      :counter="254"
      name="description"
      label="Description"
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
        v => !!v || "Description is required",
        v =>
          (v && v.length) <= 254 || "Description must be maximum 254 character"
      ]
    };
  },
  methods: {
    addDescription() {
      this.$store.commit(
        "micropageFormModule/addDescription",
        this.description
      );
    }
  },
  components: {
    InputCard
  }
};
</script>
