<template>
  <input-card>
    <div slot="title">Post Inline Script</div>
    <div slot="subtitle">
      Optional. The masterscript allow you to transform your data both by using
      JavaScript but also by including. Examples will be added.
    </div>
    <v-textarea
      v-model="postInlineScript"
      @blur="addPostInlineScript"
      :rules="postInlineScriptRules"
      :counter="1024"
      error-count="2"
      name="post-inline-script"
      type="text"
      label="Type or paste JS"
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
      postInlineScript: "",
      postInlineScriptRules: [
        v => !!v || "Post Inline Script is required",
        v =>
          (v && v.length) <= 1024 ||
          "Post Inline Script must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    const base64String = this.$store.state.serviceFormModule.postInlineScript;
    const decodedString = atob(base64String);
    this.postInlineScript = decodedString;
  },
  methods: {
    addPostInlineScript() {
      const encodedScript = btoa(this.postInlineScript);
      this.$store.commit(
        "serviceFormModule/addPostInlineScript",
        encodedScript
      );
    }
  },
  components: {
    InputCard
  }
};
</script>
