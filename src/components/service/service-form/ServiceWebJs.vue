<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      WebJs is sent to the browser as html fil. Use WebJS to construct and
      generate web applications. Used when you dont have a webserver.
    </div>
    <v-textarea
      v-model="serviceWebJS"
      @blur="addWebJS(serviceWebJS)"
      :rules="webJSRules"
      :counter="maxLen"
      error-count="1"
      name="web-js"
      type="text"
      label="Enter Web JS"
      slot="action"
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { lengthRule } from "../../../input-rules";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Web JS",
      maxLen: 256,
      serviceWebJS: "",
      webJSRules: [v => lengthRule(v, this.title, this.maxLen)]
    };
  },
  mounted() {
    this.serviceWebJS = this.webJS;
  },
  methods: {
    ...mapMutations("serviceForm", ["addWebJS"])
  },
  computed: {
    ...mapState("serviceForm", ["webJS"])
  },
  components: {
    FormInputCard
  }
};
</script>
