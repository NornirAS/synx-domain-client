<template>
  <image-response-template>
    <div slot="title">Welcome to Cioty!</div>
    <div slot="description">
      You need a domain to get started. Get 30 days free trial on your first
      domain!
    </div>
    <div slot="action">
      <v-btn
        :to="{ name: 'create-domain' }"
        class="text-capitalize"
        rounded
        small
        color="primary"
      >
        Start Free Trial
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        v-if="domainRoute"
        alt="connectedWorld"
        contain
        src="../../assets/connected-world.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
      <v-img
        v-if="serviceRoute"
        alt="addToCart"
        contain
        src="../../assets/add-to-cart.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
      <v-img
        v-if="ghostRoute"
        alt="productTeardown"
        contain
        src="../../assets/product-teardown.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </image-response-template>
</template>

<script>
import ImageResponseTemplate from "../ImageResponseTemplate";
export default {
  computed: {
    domainRoute() {
      return this.$route.name === "domains";
    },
    serviceRoute() {
      return this.$route.name === "services";
    },
    ghostRoute() {
      return this.$route.name === "ghosts";
    }
  },
  components: {
    ImageResponseTemplate
  }
};
</script>
