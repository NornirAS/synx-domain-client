<template>
  <div>
    <h1>Welcome to CIOTY domain service</h1>
    <div>
      <v-btn
        v-if="!auth"
        :to="{ name: 'signin' }"
        :color="colorBlue"
        link
        rounded
        dark
      >
        Sign In
      </v-btn>
      <v-btn
        v-if="auth"
        :to="{ name: 'services' }"
        :color="colorBlue"
        link
        rounded
        dark
      >
        Services
      </v-btn>
      <v-btn
        v-if="auth"
        @click="logOut"
        :to="{ name: 'home' }"
        :color="colorBlue"
        link
        rounded
        dark
      >
        Log Out
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout", null);
    }
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
