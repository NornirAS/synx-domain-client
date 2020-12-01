<template>
  <input-card>
    <div slot="title">Service Name</div>
    <div slot="subtitle">Typically what the service/object do.</div>
    <v-text-field
      v-model="name"
      @blur="addName"
      :disabled="isEditPage"
      :rules="nameRules"
      :counter="15"
      name="name"
      label="Service Name"
      type="text"
      error-count="2"
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
        v => (v && v.length) <= 15 || "Name must be maximum 15 character",
        v => /^[A-Za-z]+$/.test(v) || "Only alphabet characters are allowed"
      ]
    };
  },
  mounted() {
    this.name = this.serviceName;
  },
  methods: {
    addName() {
      this.$store.commit("serviceFormModule/addName", this.name);
    }
  },
  computed: {
    serviceName() {
      return this.$store.state.serviceFormModule.name;
    },
    isEditPage() {
      return this.$route.params.index >= 0;
    }
  },
  components: {
    InputCard
  }
};
</script>
