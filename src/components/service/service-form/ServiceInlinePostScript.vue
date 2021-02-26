<template>
  <form-input-card>
    <div slot="title">Inline Post-Script</div>
    <div slot="subtitle">
      The script will be executed after it has been sent to primary objects, but
      before the data is shared with the collective.
    </div>
    <v-textarea
      v-model="serviceInlinePostScript"
      @blur="addServiceInlinePostScript"
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
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceInlinePostScript: "",
      inlinePostScriptRules: [
        v =>
          (v && v.length) <= 1024 ||
          "Inline Pre-Script must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    const base64String = this.inlinePostScript;
    const decodedString = atob(base64String);
    this.serviceInlinePostScript = decodedString;
  },
  methods: {
    ...mapMutations("serviceFormModule", ["addInlinePostScript"]),
    addServiceInlinePostScript() {
      const encodedScript = btoa(this.serviceInlinePostScript);
      this.addInlinePostScript(encodedScript);
    }
  },
  computed: {
    ...mapState("serviceFormModule", ["inlinePostScript"])
  },
  components: {
    FormInputCard
  }
};
</script>
