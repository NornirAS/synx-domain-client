<template>
  <input-card>
    <div slot="title">Description</div>
    <div slot="subtitle">
      In order for the service to be found with Draape and used by others, agood
      description is recommended. What kind of data does the service provide?
    </div>
    <v-textarea
      v-model="description"
      @blur="addDescription"
      :rules="descriptionRules"
      :counter="254"
      name="description"
      label="Sevice Description"
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
  mounted() {
    this.description = this.$store.state.serviceFormModule.description;
  },
  methods: {
    addDescription() {
      this.$store.commit("serviceFormModule/addDescription", this.description);
    }
  },
  components: {
    InputCard
  }
};
</script>
