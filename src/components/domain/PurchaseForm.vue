<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Period
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Confirm
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <BillingPeriod />

        <v-row justify="space-between" align="center">
          <v-col cols="6" md="3">
            <v-btn
              :to="{ name: 'domains' }"
              :color="colorLightGrey"
              class="text-capitalize"
              rounded
              dark
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn
              :style="actionBtnStyle"
              @click="e1 = 2"
              class="text-capitalize"
              rounded
              dark
            >
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="2">
        <StripePayment />

        <slot name="form"></slot>

        <v-row justify="space-between" align="center">
          <v-col cols="6" md="3">
            <v-btn
              @click="e1 = 1"
              :color="colorLightGrey"
              class="text-capitalize"
              rounded
              dark
            >
              <v-icon small>{{ mdiUndoVariant }}</v-icon>
              Back
            </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn
              id="checkout-button"
              :style="actionBtnStyle"
              @click="checkout"
              class="text-capitalize"
              rounded
              dark
            >
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mdiUndoVariant } from "@mdi/js";
import BillingPeriod from "./BillingPeriod.vue";
import StripePayment from "./StripePayment";
export default {
  data() {
    return {
      mdiUndoVariant,
      e1: 1,
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right"
      },
      colorLightGrey: "#404B5F"
    };
  },
  methods: {
    // Send data to stripe domain name and period.
    checkout() {
      this.$socket.emit(
        "stripe_payment",
        this.domain,
        this.token,
        this.username,
        this.selectedPlan.description,
        this.selectedPlan.period
      );
    }
  },
  computed: {
    domain() {
      return this.$route.params.domainName;
    },
    selectedPlan() {
      return this.$store.state.stripeModule.selectedPlan;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.idToken;
    }
  },
  components: {
    BillingPeriod,
    StripePayment
  }
};
</script>

<style>
.theme--light.v-stepper .v-stepper__step__step {
  color: white;
  background-color: #27aae1;
}
.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
  text-shadow: 0px 0px 0px #58595b !important;
}
</style>
