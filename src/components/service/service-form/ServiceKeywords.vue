<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Enter keywords to make your service searchable.
    </div>
    <v-text-field
      v-model="keyword"
      @keydown.enter.prevent="add"
      :rules="keywordsRules"
      :disabled="isKeywordsLimit"
      :error-messages="errorMsg"
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
      :disabled="isKeywordsLimit || !isUsingAllowedCharacters"
      class="ml-4 mt-0"
      color="primary"
      slot="action"
    >
      Add
    </v-btn>
    <div slot="helper">
      <v-chip
        v-for="(keyword, index) in uniqKeywords"
        :key="index"
        @click:close="remove(index)"
        class="ma-1"
        close
        color="primary"
      >
        {{ keyword }}
      </v-chip>
    </div>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { emptyOrAlphanumericRule } from "../../../input-rules";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Keywords",
      keyword: "",
      serviceKeywords: [],
      keywordsLimit: 20,
      keywordsRules: [v => emptyOrAlphanumericRule(v, this.title)]
    };
  },
  mounted() {
    if (this.hasKeywords) {
      this.serviceKeywords = this.keywordsArray;
    }
  },
  methods: {
    ...mapMutations("serviceForm", ["addKeywords"]),
    add() {
      this.serviceKeywords.push(this.keyword);
      this.keyword = "";
    },
    remove(index) {
      this.serviceKeywords.splice(index, 1);
    }
  },
  computed: {
    ...mapState("serviceForm", ["keywords"]),
    hasKeywords() {
      return this.keywords.length > 0;
    },
    keywordsArray() {
      return this.keywords.split(" ");
    },
    keywordsString() {
      return this.uniqKeywords.join(" ");
    },
    uniqKeywords() {
      return [...new Set(this.serviceKeywords)];
    },
    isKeywordsLimit() {
      return this.uniqKeywords.length >= this.keywordsLimit;
    },
    isUsingAllowedCharacters() {
      return /^[A-Za-z0-9]+$/g.test(this.keyword);
    },
    errorMsg() {
      return this.isKeywordsLimit
        ? `You can have maximum ${this.keywordsLimit} keywords`
        : "";
    }
  },
  watch: {
    uniqKeywords() {
      this.addKeywords(this.keywordsString);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
