<template>
  <input-card>
    <div slot="title">Web JS</div>
    <div slot="subtitle">
      Add HTML or JS to dynamically create a web page with data when you do a
      post reuest(synx-cat).
    </div>
    <v-textarea
      v-model="webJS"
      @blur="addWebJS"
      :rules="webJSRules"
      :counter="256"
      error-count="2"
      name="web-js"
      type="text"
      label="Type or paste HTML/JS"
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
      webJS: "",
      webJSRules: [
        v => (v && v.length) <= 256 || "Web JS must be maximum 1024 character"
      ]
    };
  },
  methods: {
    addWebJS() {
      this.$store.commit("serviceFormModule/addWebJS", this.webJS);
    }
  },
  components: {
    InputCard
  }
};
</script>
