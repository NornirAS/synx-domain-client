<template>
  <form-input-card>
    <div slot="title">Keywords</div>
    <div slot="subtitle">
      Enter keywords to make your service searchable.
    </div>
    <v-text-field
      v-model="keyword"
      @keydown.enter.prevent="add"
      :rules="keywordsRules"
      :disabled="!isUnderKeywordsLimit"
      slot="action"
      name="keywords"
      label="Enter keyword"
      type="text"
      dense
      outlined
    >
    </v-text-field>
    <v-btn
      @click="add"
      :disabled="!isUnderKeywordsLimit || !isUsingAllowedCharacters"
      class="ml-4 mt-0"
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
        color="primary"
      >
        {{ keyword }}
      </v-chip>
    </div>
  </form-input-card>
</template>

<script>
import _ from "lodash";
import FormInputCard from "../FormInputCard";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      keyword: "",
      serviceKeywords: [],
      keywordsRules: [
        v =>
          !v || this.isUnderKeywordsLimit || "You can add maximum 20 keywords",
        v =>
          !v ||
          this.isUsingAllowedCharacters ||
          "You can use only A-Z, a-z and 0-9"
      ]
    };
  },
  mounted() {
    if (this.hasKeywords) {
      this.serviceKeywords = this.keywordsArray;
    }
  },
  methods: {
    ...mapMutations("serviceFormModule", ["addKeywords"]),
    add() {
      this.serviceKeywords.push(this.keyword);
      this.keyword = "";
    },
    remove(index) {
      this.serviceKeywords.splice(index, 1);
    }
  },
  computed: {
    ...mapState("serviceFormModule", ["keywords"]),
    keywordsArray() {
      return this.keywords.split(" ");
    },
    keywordsString() {
      return this.serviceKeywords.join(" ");
    },
    hasKeywords() {
      return this.keywords !== "";
    },
    sortedUniqKeywords() {
      return _.uniq(this.serviceKeywords);
    },
    isUnderKeywordsLimit() {
      return this.sortedUniqKeywords.length <= 20;
    },
    isUsingAllowedCharacters() {
      return /^[A-Za-z0-9]+$/g.test(this.keyword);
    }
  },
  watch: {
    serviceKeywords() {
      this.addKeywords(this.keywordsString);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
