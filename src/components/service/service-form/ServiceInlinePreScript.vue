<template>
  <form-input-card>
    <div slot="title">Inline Pre-Script</div>
    <div slot="subtitle">
      This predicate script is executed before data distribution. Use this
      script to transform targeted (linked) service data format into your own
      data structure format. Always keep your data structure intact and
      transform external data sources into your data structure.
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
