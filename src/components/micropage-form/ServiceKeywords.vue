<template>
  <input-card>
    <div slot="title">Keywords</div>
    <div slot="subtitle">
      Make it easier for humans to search for your service.
    </div>
    <v-text-field
      v-model="keyword"
      :rules="keywordsRules"
      :disabled="!isUnderKeywordsLimit"
      slot="action"
      name="keywords"
      label="Add up to 20 keywords"
      type="text"
      dense
      outlined
    >
    </v-text-field>
    <v-btn
      @click="add"
      :disabled="!isUnderKeywordsLimit || !isUsingAllowedCharacters"
      color="primary"
      slot="action"
    >
      Add
    </v-btn>
    <div slot="helper">
      <v-chip
        v-for="(keyword, index) in sortedUniqKeywords"
        :key="index"
        @click:close="remove(index)"
        class="ma-1"
        close
        outlined
        color="secondary"
      >
        {{ keyword }}
      </v-chip>
    </div>
  </input-card>
</template>

<script>
import _ from "lodash";
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      keyword: "",
      keywords: [],
      keywordsRules: [
        v =>
          !v || this.isUnderKeywordsLimit || "You can add maximum 20 keywords",
        v =>
          !v || this.isUsingAllowedCharacters || "You can use only a-z and 0-9"
      ]
    };
  },
  mounted() {
    this.keywords = this.serviceKeywords;
  },
  methods: {
    add() {
      this.keywords.push(this.keyword);
      this.keyword = "";
    },
    remove(index) {
      this.keywords.splice(index, 1);
    }
  },
  computed: {
    serviceKeywords() {
      return this.$store.state.serviceFormModule.keywords;
    },
    sortedUniqKeywords() {
      return _.uniq(this.keywords);
    },
    isUnderKeywordsLimit() {
      return this.sortedUniqKeywords.length <= 20;
    },
    isUsingAllowedCharacters() {
      return /^[a-z0-9]+$/g.test(this.keyword);
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
.v-btn {
  margin: 0.12em 0 0 0.5em;
}
</style>
