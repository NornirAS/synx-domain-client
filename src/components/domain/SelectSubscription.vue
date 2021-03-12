<template>
  <v-row>
    <v-col
      md="4"
      v-for="({ title, description, annualCost, monthlyCost, discount },
      index) in subscriptionPlans"
      :key="index"
      :value="index"
    >
      <v-radio-group v-model="selected">
        <subscription-card
          :value="index"
          :class="{ 'selected-card': selected === index }"
        >
          <div slot="title">{{ title }}</div>
          <div slot="radio-button" class="float-right">
            <v-radio :value="index" color="info"></v-radio>
          </div>
          <v-chip
            v-if="hasTrial"
            slot="trial"
            color="info"
            class="ml-n6 mt-2"
            small
            label
            >Free 30 days Trial</v-chip
          >
          <div slot="description">{{ description }}</div>
          <div slot="description">{{ annualCost }}</div>
          <div slot="monthlyCost">{{ monthlyCost }}</div>
          <v-chip
            v-if="discount"
            slot="discount"
            color="accent"
            class="mr-n6"
            small
            label
            >{{ discount }}</v-chip
          >
        </subscription-card>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import SubscriptionCard from "./SubscriptionCard";
export default {
  data() {
    return {
      selected: 2
    };
  },
  created() {
    this.selectPlan(this.selected);
  },
  methods: {
    ...mapMutations("stripeModule", ["selectPlan"])
  },
  computed: {
    ...mapState("domainsModule", ["domains"]),
    ...mapState("stripeModule", ["subscriptionPlans"]),
    ...mapGetters("domainsModule", ["noDomains", "hasInactiveDomain"]),
    hasSingleDomain() {
      return this.domains.length === 1;
    },
    hasTrial() {
      return this.hasSingleDomain === this.hasInactiveDomain;
    }
  },
  watch: {
    selected(newValue) {
      this.selectPlan(newValue);
    }
  },
  components: {
    SubscriptionCard
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 1em;
  padding: 0;
}
.selected-card {
  background-color: #ebeff4;
}
</style>
