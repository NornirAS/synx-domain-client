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
          v-bind:class="{ 'selected-card': selected === index }"
        >
          :value="index">
          <div slot="title">{{ title }}</div>
          <div slot="radio-button" class="float-right">
            <v-radio :value="index" color="primary"></v-radio>
          </div>
          <v-chip
            v-if="noDomains"
            slot="trial"
            color="primary"
            class="ml-n6 mt-2"
            small
            label
            >Free Trial</v-chip
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
import _ from "lodash";
import SubscriptionCard from "./SubscriptionCard";
export default {
  data() {
    return {
      selected: 2
    };
  },
  created() {
    this.$store.commit("stripeModule/selectPlan", this.selected);
  },
  computed: {
    subscriptionPlans() {
      return this.$store.state.stripeModule.subscriptionPlans;
    },
    domains() {
      return this.$store.state.domainsModule.ownedDomains;
    },
    noDomains() {
      return _.isEmpty(this.domains);
    }
  },
  watch: {
    selected(newValue) {
      this.$store.commit("stripeModule/selectPlan", newValue);
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
  flex-grow: 1;
}
.font-weight-bold {
  color: var(--v-accent-base);
}
.selected-card {
  background-color: var(--v-background-base);
}
</style>
