<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Domain
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Period
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">
        Contact Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">
        Confirm
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <DomainSearch />
        <v-row justify="space-between" align="center">
          <v-col cols="6" md="3">
            <v-btn text>
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn :style="actionBtnStyle" @click="e1 = 2" rounded dark>
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="2">
        <BillingPeriod />

        <v-row justify="space-between" align="center">
          <v-col cols="6" md="3">
            <v-btn text>
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn :style="actionBtnStyle" @click="e1 = 3" rounded dark>
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        <slot name="form"></slot>

        <v-row justify="center" align="center">
          <v-col cols="6" md="3">
            <v-btn text>
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn :style="actionBtnStyle" @click="e1 = 4" rounded dark>
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="4">
        <slot name="confirm"></slot>

        <v-row justify="center" align="center">
          <v-col cols="6" md="3">
            <v-btn text>
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn :style="actionBtnStyle" @click="e1 = 1" rounded dark>
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import DomainSearch from "./DomainSearch.vue";
import BillingPeriod from "./BillingPeriod.vue";
export default {
  data() {
    return {
      e1: 1,
      actionBtnStyle: {
        backgroundColor: "#71b663",
        float: "right"
      }
    };
  },
  components: {
    DomainSearch,
    BillingPeriod
  }
};
</script>

<style>
.theme--light.v-stepper .v-stepper__step__step {
  color: white;
  background-color: #71b663;
}
.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
  text-shadow: 0px 0px 0px #58595b !important;
}
</style>
