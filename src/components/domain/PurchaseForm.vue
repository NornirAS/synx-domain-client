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
        <v-container>
          <div class="title">Choose subscription plan</div>
          <select-subscription></select-subscription>
          <div class="body-1 mb-6">
            30 days free trial for all subscription plans. Payment will be done
            after trial. Cancel anytime.
          </div>
          <v-btn
            @click="backToDomains"
            class="text-capitalize"
            color="secondary"
            text
          >
            Cancel
          </v-btn>
          <v-btn
            @click="e1 = 2"
            class="text-capitalize"
            color="primary"
            rounded
            small
          >
            Continue
          </v-btn>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container>
          <div class="title">Confirm your order</div>
          <stripe-payment></stripe-payment>
          <v-btn @click="e1 = 1" class="text-capitalize" color="secondary" text>
            Back
          </v-btn>
          <v-btn
            id="checkout-button"
            @click="checkout"
            class="text-capitalize"
            color="primary"
            rounded
            small
          >
            Continue
          </v-btn>
        </v-container>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import SelectSubscription from "./SelectSubscription.vue";
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
      this.$socket.emit("stripe_payment", {
        domain: this.domainURL,
        token: this.token,
        username: this.username,
        subscription: this.selectedPlan
      });
    },
    backToDomains() {
      this.$router.push({ name: "domains" });
    }
  },
  computed: {
    domain() {
      return this.$route.params.domainName;
    },
    domainURL() {
      return `${this.domain}.cioty.com`;
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
    SelectSubscription,
    StripePayment
  }
};
</script>
