<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Enter service description so you will remember you services later.
    </div>
    <v-textarea
      v-model="serviceDescription"
      @blur="addDescription(serviceDescription)"
      :rules="descriptionRules"
      :counter="maxLen"
      name="description"
      label="Service description"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { requiredRule, lengthRule } from "../../../input-rules";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Description",
      maxLen: 512,
      serviceDescription: "",
      descriptionRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen)
      ]
    };
  },
  mounted() {
    this.serviceDescription = this.description;
  },
  methods: {
    ...mapMutations("serviceForm", ["addDescription"])
  },
  computed: {
    ...mapState("serviceForm", ["description"])
  },
  components: {
    FormInputCard
  }
};
</script>
