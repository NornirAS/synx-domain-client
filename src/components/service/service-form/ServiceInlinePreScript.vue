<template>
  <form-input-card>
    <div slot="title">Inline Pre-Script</div>
    <div slot="subtitle">
      This script will be executed before the data is sent to primary objects
      and services linked to you.
    </div>
    <v-textarea
      v-model="serviceInlinePreScript"
      @blur="addInlinePreScript(encodedInlinePreScript)"
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
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      serviceInlinePreScript: "",
      inlinePreScriptRules: [
        v =>
          (v && v.length) <= 1024 ||
          "Inline Pre-Script must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    this.serviceInlinePreScript = this.decodedInlinePreScript;
  },
  methods: {
    ...mapMutations("serviceForm", ["addInlinePreScript"])
  },
  computed: {
    ...mapState("serviceForm", ["inlinePreScript"]),
    encodedInlinePreScript() {
      return btoa(this.serviceInlinePreScript);
    },
    decodedInlinePreScript() {
      return atob(this.inlinePreScript);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
