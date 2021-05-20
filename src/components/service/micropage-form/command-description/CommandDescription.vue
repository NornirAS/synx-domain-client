<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Describe your command and which option the secondary service provider with
      an active link can perform on your service.
    </div>
    <v-textarea
      v-model="description"
      @blur="addCommandDescription(description)"
      :rules="descriptionRules"
      :counter="maxLen"
      name="description"
      label="Describe your public commands"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-textarea>
    <command-details slot="helper" class="mb-6"></command-details>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { requiredRule, lengthRule } from "../../../../input-rules";
import FormInputCard from "../../../globals/FormInputCard";
import CommandDetails from "./CommandDetails";
export default {
  data() {
    return {
      title: "Command Description",
      maxLen: 512,
      description: "",
      descriptionRules: [
        v => requiredRule(v, this.title),
        v => lengthRule(v, this.title, this.maxLen)
      ]
    };
  },
  methods: {
    ...mapMutations("micropageForm", ["addCommandDescription"])
  },
  computed: {
    ...mapState("micropageForm", ["commandOverview"])
  },
  watch: {
    commandOverview(newValue) {
      this.description = newValue.description;
    }
  },
  components: {
    FormInputCard,
    CommandDetails
  }
};
</script>
