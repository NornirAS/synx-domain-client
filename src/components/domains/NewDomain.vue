<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        v-if="isNewDomain"
        color="info"
        :complete="e1 > 1"
        step="1"
      >
        Domain
      </v-stepper-step>
      <v-divider v-if="isNewDomain"></v-divider>
      <v-stepper-step color="info" :complete="e1 > stepTwo" :step="stepTwo">
        Period
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step color="info" :complete="e1 > stepThree" :step="stepThree">
        Confirm
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content v-if="isNewDomain" step="1">
        <div class="title">Enter domain name</div>
        <domain-form class="mb-4"></domain-form>
        <v-btn
          @click="backToDomains"
          class="text-capitalize"
          color="primary"
          text
        >
          Back
        </v-btn>
        <v-btn
          form="domain-form"
          type="submit"
          class="text-capitalize"
          color="info"
          rounded
          small
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content :step="stepTwo">
        <div class="title">Choose subscription plan</div>
        <select-subscription></select-subscription>
        <div v-if="hasTrial" class="body-1 mb-4">
          30 days free trial for all subscription plans. Payment will be done
          after trial. Cancel anytime.
        </div>
        <v-btn
          @click="
            isNewDomain ? deleteDomainAndSendToDomains() : backToDomains()
          "
          class="text-capitalize"
          color="primary"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          @click="e1 = stepThree"
          class="text-capitalize"
          color="info"
          rounded
          small
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content :step="stepThree">
        <div class="title">Confirm your order</div>
        <confirm-order class="mb-4"></confirm-order>
        <v-btn
          @click="e1 = stepTwo"
          class="text-capitalize"
          color="primary"
          text
        >
          Back
        </v-btn>
        <v-btn
          id="checkout-button"
          @click="checkout"
          class="text-capitalize"
          color="info"
          rounded
          small
        >
          Continue
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DomainForm from "./DomainForm";
import SelectSubscription from "./SelectSubscription";
import ConfirmOrder from "./ConfirmOrder";
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
        domain: this.domain,
        token: this.token,
        username: this.username,
        subscription: this.selectedPlan,
        isNewDomain: this.isNewDomain
      });
    },
    deleteDomain() {
      this.$socket.emit("delete_domain", {
        token: this.token,
        username: this.username,
        domain: this.domain,
        feature: "remove"
      });
      this.dialog = false;
    },
    backToDomains() {
      this.$router.push({ name: "domains" });
    },
    deleteDomainAndSendToDomains() {
      this.deleteDomain();
      this.backToDomains();
    }
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    ...mapState("stripeModule", ["selectedPlan", "domain"]),
    ...mapState("alarmModule", ["createDomainSuccess"]),
    ...mapGetters("domainsModule", ["hasTrial"]),
    isNewDomain() {
      return this.$route.name === "create-domain";
    },
    stepTwo() {
      return this.isNewDomain ? 2 : 1;
    },
    stepThree() {
      return this.isNewDomain ? 3 : 2;
    }
  },
  watch: {
    createDomainSuccess() {
      this.e1 = 2;
    }
  },
  components: {
    DomainForm,
    SelectSubscription,
    ConfirmOrder
  }
};
</script>
