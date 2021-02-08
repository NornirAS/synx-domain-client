<template>
  <input-card>
    <div slot="title">Inline Pre-Script</div>
    <div slot="subtitle">
      This script will be executed before the data is sent to primary objects
      and services linked to you.
    </div>
    <v-textarea
      v-model="inlinePreScript"
      @blur="addinlinePreScript"
      :rules="inlinePreScriptRules"
      :counter="1024"
      error-count="1"
      name="inline-pre-script"
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
export default {
  data() {
    return {
      inlinePreScript: "",
      inlinePreScriptRules: [
        v =>
          (v && v.length) <= 1024 ||
          "Inline Pre-Script must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    const base64String = this.serviceInlinePreScript;
    const decodedString = atob(base64String);
    this.inlinePreScript = decodedString;
  },
  methods: {
    addinlinePreScript() {
      const encodedScript = btoa(this.inlinePreScript);
      this.$store.commit("serviceFormModule/addInlinePreScript", encodedScript);
    }
  },
  computed: {
    serviceInlinePreScript() {
      return this.$store.state.serviceFormModule.inlinePreScript;
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
