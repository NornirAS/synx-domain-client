<template>
  <input-card>
    <div slot="title">Name*</div>
    <div slot="subtitle">The name will also be visible in the URL/URI.</div>
    <v-text-field
      v-model="name"
      @blur="addName"
      :rules="nameRules"
      :counter="64"
      :disabled="isServiceUpdate"
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
  mounted() {
    this.name = this.serviceName;
  },
  methods: {
    addName() {
      this.$store.commit("serviceFormModule/addName", this.name);
    }
  },
  computed: {
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    serviceName() {
      return this.$store.state.serviceFormModule.name;
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
