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
      <v-btn @click="add" slot="append" icon small>
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-text-field>
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
          !v || this.isUnderKeywordsLimit || "You can add maximum 20 keywords"
      ]
    };
  },
  mounted() {
    this.keywords = this.$store.state.serviceFormModule.keywords;
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
    sortedUniqKeywords() {
      return _.sortedUniq(this.keywords);
    },
    isUnderKeywordsLimit() {
      return this.sortedUniqKeywords.length <= 20;
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
  margin: 0;
}
.v-icon.v-icon {
  color: #ffffff;
  background-color: var(--v-primary-base);
  border-radius: 15px;
}
</style>
