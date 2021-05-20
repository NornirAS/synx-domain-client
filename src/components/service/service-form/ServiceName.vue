<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Add a unique service name - the name will be part of the URI address.
    </div>
    <v-text-field
      v-model="serviceName"
      @blur="addName(serviceName)"
      :rules="nameRules"
      :counter="maxLen"
      :disabled="isServiceUpdate"
      name="name"
      label="Enter service name"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-text-field>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { requiredRule, lengthRule, urlPartRule } from "../../../input-rules";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Service Name",
      maxLen: 63,
      serviceName: "",
      nameRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen),
        v => urlPartRule(v, this.title)
      ]
    };
  },
  mounted() {
    this.serviceName = this.name;
  },
  methods: {
    ...mapMutations("serviceForm", ["addName"])
  },
  computed: {
    ...mapState("serviceForm", ["name"]),
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    }
  },
  components: {
    FormInputCard
  }
};
</script>
