<template>
  <div>
    <h1>Confirm</h1>
    <div>
      <span>Domain: </span><span align="right">{{ domain }}</span>
    </div>
    <div>Subscription plan: {{ selectedPlan.name }}</div>
    <div>Price: {{ selectedPlan.price }}</div>
    <v-divider></v-divider>
    <div align="right">Total: ${{ selectedPlan.total }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stripeAPIToken: "",
      stripe: "",
      elements: "",
      card: ""
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
    /*
      Configures Stripe by setting up the elements and 
      creating the card element.
    */
    configureStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = Stripe(this.stripeAPIToken);
    }
  },
  computed: {
    domain() {
      return this.$route.params.domainName;
    },
    session() {
      return this.$store.state.stripeModule.session;
    },
    selectedPlan() {
      return this.$store.state.stripeModule.selectedPlan;
    }
  },
  watch: {
    session(newValue) {
      return this.stripe.redirectToCheckout({ sessionId: newValue.id });
    }
  }
};
</script>
