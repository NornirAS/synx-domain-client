<template>
  <input-card>
    <div slot="title">Pre Inline Script</div>
    <div slot="subtitle">
      Optional. The masterscript allow you to transform your data both by using
      JavaScript but also by including. Examples will be added.
    </div>
    <v-textarea
      v-model="preInlineScript"
      @blur="addPreInlineScript"
      :rules="preInlineScriptRules"
      :counter="1024"
      error-count="2"
      name="pre-inline-script"
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
      preInlineScript: "",
      preInlineScriptRules: [
        v => !!v || "Pre Inline Script is required",
        v =>
          (v && v.length) <= 1024 ||
          "Pre Inline Script must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    const base64String = this.$store.state.serviceFormModule.preInlineScript;
    const decodedString = atob(base64String);
    this.preInlineScript = decodedString;
  },
  methods: {
    addPreInlineScript() {
      const encodedScript = btoa(this.preInlineScript);
      this.$store.commit("serviceFormModule/addPreInlineScript", encodedScript);
    }
  },
  components: {
    InputCard
  }
};
</script>
