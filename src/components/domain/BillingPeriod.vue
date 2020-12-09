<template>
  <v-row>
    <v-col cols="12">
      <h1>Choose your subscription plan</h1>
    </v-col>
    <v-col cols="8" md="6">
      <v-radio-group v-model="selected">
        <v-radio
          v-for="({ name, period }, index) in cycles"
          :key="index"
          :label="name"
          :value="period"
          :color="colorGreen"
        ></v-radio>
      </v-radio-group>
    </v-col>
    <v-col cols="4" md="6">
      <p v-for="({ price, discount }, index) in cycles" :key="index">
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
      selected: "6",
      cycles: [
        {
          name: "1 Month",
          period: "1",
          price: "60$ / year"
        },
        {
          name: "3 Months",
          period: "3",
          price: "60$ / year"
        },
        {
          name: "6 Months",
          period: "6",
          price: "55$ / year",
          discount: "1 Month FREE!"
        },
        {
          name: "12 Month",
          period: "12",
          price: "50$ / year",
          discount: "2 Months FREE!"
        }
      ],
      discountStyle: {
        color: "#71b663",
        float: "right"
      },
      colorGreen: "#71b663"
    };
  },
  created() {
    this.$store.commit("stripeModule/addPlan", this.selected);
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    }
  },
  watch: {
    selected(newValue) {
      this.$store.commit("stripeModule/addPlan", newValue);
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
