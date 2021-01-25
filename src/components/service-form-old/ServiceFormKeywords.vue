<template>
  <input-card>
    <div slot="title">Keywords</div>
    <div slot="subtitle">
      Search keywords to easily discover your service.
    </div>
    <v-combobox
      v-model="keywords"
      :rules="keywordRules"
      :counter="30"
      name="keywords"
      label="Press 'Enter' to insert"
      type="text"
      error-count="2"
      slot="action"
      multiple
      chips
    >
      <template v-slot:selection="data">
        <v-chip
          :key="data.index"
          v-bind="data.attrs"
          @click:close="remove(data.index)"
          close
        >
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>
  </input-card>
</template>

<script>
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      keywords: "",
      keywordRules: [
        v => (v && v.length) >= 1 || "Keyword is required",
        v => (v && v.length) <= 30 || "You can add maximum 30 keywords",
        v =>
          (v && !/[^ \w]/.test(v.join(" "))) ||
          "You can use only alpabetical characters and numbers"
      ]
    };
  },
  mounted() {
    this.keywords = this.$store.state.serviceFormModule.keywords;
  },
  methods: {
    remove(index) {
      this.keywords.splice(index, 1);
    }
  },
  watch: {
    keywords() {
      this.$store.commit("serviceFormModule/addKeywords", this.keywords);
    }
  },
  components: {
    InputCard
  }
};
</script>

<style scoped>
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}
</style>
