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
      label="Post Inline Script"
      slot="action"
      required
      outlined
      dense
    ></v-textarea>
  </input-card>
</template>

<script>
import InputCard from "./ServiceFormInputCard";
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
    this.postInlineScript = this.$store.state.serviceFormModule.postInlineScript;
  },
  methods: {
    addPostInlineScript() {
      this.$store.commit(
        "serviceFormModule/addPostInlineScript",
        this.postInlineScript
      );
    }
  },
  components: {
    InputCard
  }
};
</script>
