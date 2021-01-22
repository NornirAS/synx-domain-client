<template>
  <input-card>
    <div slot="title">Inline Post-Script</div>
    <div slot="subtitle">
      The script will be executed after it has been sent to primary objects, but
      before the data is shared with the collective.
    </div>
    <v-textarea
      v-model="inlinePostScript"
      @blur="addInlinePostScript"
      :rules="inlinePostScriptRules"
      :counter="1024"
      error-count="1"
      name="inline-post-script"
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
      inlinePostScript: "",
      inlinePostScriptRules: [
        v =>
          (v && v.length) <= 1024 ||
          "Inline Pre-Script must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    const base64String = this.$store.state.serviceFormModule.inlinePostScript;
    const decodedString = atob(base64String);
    this.inlinePostScript = decodedString;
  },
  methods: {
    addInlinePostScript() {
      const encodedScript = btoa(this.inlinePostScript);
      this.$store.commit(
        "serviceFormModule/addInlinePostScript",
        encodedScript
      );
    }
  },
  components: {
    InputCard
  }
};
</script>
