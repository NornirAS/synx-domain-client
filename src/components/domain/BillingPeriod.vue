<template>
  <v-container>
    <div class="title">Choose subscription plan</div>
    <v-row>
      <v-col
        md="4"
        v-for="({ title, description, annualCost, monthlyCost, discount },
        index) in subscriptionPlans"
        :key="index"
        :value="index"
      >
        <v-radio-group v-model="selected">
          <subscription-card>
            <div slot="title">{{ title }}</div>
            <div slot="radio-button" class="float-right">
              <v-radio :value="index" color="primary"></v-radio>
            </div>
            <div slot="description">{{ description }}</div>
            <div slot="description">{{ annualCost }}</div>
            <div slot="monthlyCost">{{ monthlyCost }}</div>
            <div slot="discount" class="font-weight-bold">{{ discount }}</div>
          </subscription-card>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
</style>
