<template>
  <div>
    <h1>{{ title.toUpperCase() }}</h1>
    <v-row>
      <v-col cols="6" md="7">
        <v-radio-group v-model="selected">
          <v-radio
            v-for="({ period }, index) in cycles"
            :key="index"
            :label="period"
            :value="index"
            :color="colorGreen"
            @change="addPlan(period)"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="6" md="5">
        <p v-for="({ price, discount }, index) in cycles" :key="index">
          {{ price }}$/year
          <span :style="discountStyle" v-if="discount">
            save {{ discount }}%
          </span>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Choose your billing period",
      selected: 1,
      cycles: [
        {
          period: "1 Month plan",
          price: "60",
          discount: ""
        },
        {
          period: "1 Year plan",
          price: "54",
          discount: "10"
        }
      ],
      discountStyle: {
        color: "#71b663",
        float: "right"
      },
      colorGreen: "#71b663"
    };
  },
  methods: {
    addPlan(period) {
      this.$store.commit("stripeModule/addPlan", period);
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
  color: #58595b;
  font-weight: 500;
  margin-bottom: 18px;
}
p {
  margin-bottom: 8px;
  color: #58595b;
}
.v-btn {
  color: #71b663;
}
.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
  padding-left: 10px;
}
</style>
