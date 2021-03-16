<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>Domain</v-list-item-title>
      <v-list-item-subtitle class="text-right font-weight-bold">
        {{ domain }}{{ rootDomain }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>Subscription plan</v-list-item-title>
      <v-list-item-subtitle class="text-right font-weight-bold">
        {{ selectedPlan.title }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>Billing</v-list-item-title>
      <v-list-item-subtitle class="text-right font-weight-bold">
        {{ selectedPlan.description }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item v-if="hasTrial">
      <v-list-item-title>Trial period</v-list-item-title>
      <v-list-item-subtitle class="text-right font-weight-bold">
        30 days free
      </v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-title class="title">Total</v-list-item-title>
      <v-list-item-subtitle
        v-if="noDomains"
        class="title text-right font-weight-bold"
      >
        $0
      </v-list-item-subtitle>
      <v-list-item-subtitle v-else class="title text-right font-weight-bold">
        ${{ selectedPlan.total }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script>
import { rootDomain } from "../../core/config";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      rootDomain,
      stripeAPIToken: "",
      stripe: ""
    };
  },
  created() {
    this.stripeAPIToken = process.env.VUE_APP_STRIPE_PUBLIC;
  },
  mounted() {
    this.includeStripe(
      "js.stripe.com/v3/",
      function() {
        this.configureStripe();
      }.bind(this)
    );
  },
  methods: {
    /*
      Includes Stripe.js dynamically
    */
    includeStripe(URL, callback) {
      let documentTag = document,
        tag = "script",
        object = documentTag.createElement(tag),
        scriptTag = documentTag.getElementsByTagName(tag)[0];
      object.src = "//" + URL;
      if (callback) {
        object.addEventListener(
          "load",
          function(e) {
            callback(null, e);
          },
          false
        );
      }
      scriptTag.parentNode.insertBefore(object, scriptTag);
    },
    configureStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = Stripe(this.stripeAPIToken);
    }
  },
  computed: {
    ...mapState("stripeModule", ["session", "selectedPlan"]),
    ...mapState("domainsModule", ["domains"]),
    ...mapGetters("domainsModule", ["noDomains", "hasTrial"]),
    domain() {
      return this.$route.params.domainName;
    }
  },
  watch: {
    session(newValue) {
      return this.stripe.redirectToCheckout({ sessionId: newValue.id });
    }
  }
};
</script>
