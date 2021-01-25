<template>
  <input-card>
    <div slot="title">Morphic WebHook</div>
    <div slot="subtitle">
      Optional. The WEBJS-feature allow you to push data to your clients when
      they connect to your service. All standard webcoding is supported such as
      javascript and html. Examples will be added.
    </div>
    <v-textarea
      v-model="webJS"
      @blur="addWebJS"
      :rules="webJSRules"
      :counter="254"
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
        v => !!v || "Web JS is required",
        v => (v && v.length) <= 254 || "Web JS must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    this.webJS = this.$store.state.serviceFormModule.webJS;
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
