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
        <billing-period></billing-period>
        <v-btn
          @click="toDomainPage"
          class="text-capitalize"
          color="secondary"
          rounded
          outlined
        >
          Cancel
        </v-btn>
        <v-btn @click="e1 = 2" class="text-capitalize" color="primary" rounded>
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <stripe-payment></stripe-payment>
        <v-btn
          @click="e1 = 1"
          class="text-capitalize"
          color="secondary"
          rounded
          outlined
        >
          Back
        </v-btn>
        <v-btn
          id="checkout-button"
          @click="checkout"
          class="text-capitalize"
          color="primary"
          rounded
        >
          Continue
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BillingPeriod from "./BillingPeriod.vue";
import StripePayment from "./StripePayment";
export default {
  data() {
    return {
      e1: 1
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
        this.selectedPlan.period
      );
    },
    toDomainPage() {
      this.$router.push({ name: "domains" });
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
