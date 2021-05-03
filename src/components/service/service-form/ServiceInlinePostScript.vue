<template>
  <form-input-card>
    <div slot="title">Inline Post-Script</div>
    <div slot="subtitle">
      This predicate noun script is executed after data distribution and before
      secondary service with an active link gets it. Use this script to
      transform your own data structure format into what you want the secondary
      service to receive. Remember to describe the resulting data model in the
      micropage section or it would be difficult for others to understand your
      data structure.
    </div>
    <v-textarea
      v-model="serviceInlinePostScript"
      @blur="addInlinePostScript(encodedInlinePostScript)"
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
import FormInputCard from "../../globals/FormInputCard";
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
    this.serviceInlinePostScript = this.decodedInlinePostScript;
  },
  methods: {
    ...mapMutations("serviceForm", ["addInlinePostScript"])
  },
  computed: {
    ...mapState("serviceForm", ["inlinePostScript"]),
    encodedInlinePostScript() {
      return btoa(this.serviceInlinePostScript);
    },
    decodedInlinePostScript() {
      return atob(this.inlinePostScript);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
