<template>
  <v-row>
    <v-col cols="12">
      <h1>Choose your subscription plan</h1>
    </v-col>
    <v-col cols="8" md="6">
      <v-radio-group v-model="selected">
        <v-radio
          v-for="({ description }, index) in subscriptionPlans"
          :key="index"
          :label="description"
          :value="index"
          :color="colorGreen"
        ></v-radio>
      </v-radio-group>
    </v-col>
    <v-col cols="4" md="6">
      <p v-for="({ price, discount }, index) in subscriptionPlans" :key="index">
        {{ price }}
        <span v-if="discount && !isMobile" :style="discountStyle">
          {{ discount }}
        </span>
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      title: "Choose your billing period",
      selected: 2,
      discountStyle: {
        color: "#71b663",
        float: "right"
      },
      colorGreen: "#71b663"
    };
  },
  created() {
    this.$store.commit("stripeModule/selectPlan", this.selected);
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
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

<style scoped>
h1 {
  font-size: 24px;
  color: #58595b;
  font-weight: 500;
}
p {
  margin-bottom: 8px;
  color: #58595b;
}
.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
  padding-left: 10px;
}
</style>
