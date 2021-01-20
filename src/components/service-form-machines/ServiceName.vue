<template>
  <input-card>
    <div slot="title">Name</div>
    <div slot="subtitle">The name will also be visible in the URL/URI.</div>
    <v-text-field
      v-model="name"
      @blur="addName"
      :rules="nameRules"
      :counter="64"
      name="name"
      label="Add your service name"
      type="text"
      error-count="1"
      slot="action"
      required
      outlined
      dense
    ></v-text-field>
  </input-card>
</template>

<script>
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length) <= 64 || "Name must be maximum 64 character",
        v =>
          /^[A-Za-z\d-]+$/.test(v) ||
          "Only alphabet characters, numbers and '-' are allowed"
      ]
    };
  },
  methods: {
    addName() {
      this.$store.commit("serviceFormModule/addName", this.name);
    }
  },
  components: {
    InputCard
  }
};
</script>
