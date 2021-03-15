<template>
  <form-input-card>
    <div slot="title">Name</div>
    <div slot="subtitle">
      Add a unique service name - the name will be part of the URI address.
    </div>
    <v-text-field
      v-model="serviceName"
      @blur="addServiceName"
      :rules="nameRules"
      :counter="64"
      :disabled="isServiceUpdate"
      name="name"
      label="Enter service name"
      type="text"
      error-count="1"
      slot="action"
      required
      outlined
      dense
    ></v-text-field>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceName: "",
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
    this.serviceName = this.name;
  },
  methods: {
    ...mapMutations("serviceFormModule", ["addName"]),
    addServiceName() {
      this.addName(this.serviceName);
    }
  },
  computed: {
    ...mapState("serviceFormModule", ["name"]),
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    }
  },
  components: {
    FormInputCard
  }
};
</script>
