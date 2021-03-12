<template>
  <form-input-card>
    <div slot="title">Keywords</div>
    <div slot="subtitle">
      Make it easier for humans to search for your service.
    </div>
    <v-text-field
      v-model="keyword"
      @keydown.enter.prevent="add"
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
      class="ml-4 mt-0"
      color="info"
      height="40px"
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
    const isNotEmpty = this.keywords.length >= 1;
    if (isNotEmpty) {
      this.serviceKeywords = this.keywords.split(" ");
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
      this.addKeywords(this.serviceKeywords.join(" "));
    }
  },
  components: {
    FormInputCard
  }
};
</script>
