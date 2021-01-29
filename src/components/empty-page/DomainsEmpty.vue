<template>
  <empty-page-template>
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
        Get Started
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        v-if="domainRoute"
        alt="connectedWorld"
        contain
        src="../../assets/connected-world.png"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
      <v-img
        v-if="serviceRoute"
        alt="addToCart"
        contain
        src="../../assets/add-to-cart.png"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </empty-page-template>
</template>

<script>
import EmptyPageTemplate from "./EmptyPageTemplate";
export default {
  computed: {
    domainRoute() {
      return this.$route.name === "domains";
    },
    serviceRoute() {
      return this.$route.name === "services";
    }
  },
  components: {
    EmptyPageTemplate
  }
};
</script>
