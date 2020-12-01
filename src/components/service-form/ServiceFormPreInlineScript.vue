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
      label="Pre Inline Script"
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
    this.preInlineScript = this.$store.state.serviceFormModule.preInlineScript;
  },
  methods: {
    addPreInlineScript() {
      this.$store.commit(
        "serviceFormModule/addPreInlineScript",
        this.preInlineScript
      );
    }
  },
  components: {
    InputCard
  }
};
</script>
