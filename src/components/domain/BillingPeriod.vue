<template>
  <v-container fluid>
    <div>Choose your subscription plan</div>
    <v-radio-group v-model="selected">
      <v-radio
        v-for="({ description, price, discount }, index) in subscriptionPlans"
        :key="index"
        :value="index"
      >
        <template v-slot:label>
          <div>
            {{ description }} <strong>{{ price }}</strong>
            <strong class="accent--text"> {{ discount }}</strong>
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
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
  }
};
</script>
