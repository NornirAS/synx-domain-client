<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Enter your description of your service {{ service }}. This information
      will be available for service engines and will be visible at
      {{ url }} when someone does a normal get request.
    </div>
    <v-textarea
      v-model="description"
      @blur="addServiceDescription(description)"
      :rules="descriptionRules"
      :counter="maxLen"
      name="description"
      label="Describe your service for the public"
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
  props: ["service", "url"],
  data() {
    return {
      title: "Service Description",
      maxLen: 512,
      description: "",
      descriptionRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen)
      ]
    };
  },

  mounted() {
    this.description = this.serviceDescription;
  },

  methods: {
    ...mapMutations("micropageForm", ["addServiceDescription"])
  },

  computed: {
    ...mapState("micropageForm", ["serviceDescription"])
  },

  watch: {
    serviceDescription(newValue) {
      this.description = newValue;
    }
  },

  components: {
    FormInputCard
  }
};
</script>
