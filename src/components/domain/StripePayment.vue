<template>
  <div>
    <h1>Confirm</h1>
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
    session() {
      return this.$store.state.stripeModule.session;
    }
  },
  watch: {
    session(newValue) {
      return this.stripe.redirectToCheckout({ sessionId: newValue.id });
    }
  }
};
</script>
