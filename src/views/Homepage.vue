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
        :to="{ name: 'domains' }"
        :color="colorBlue"
        link
        rounded
        dark
      >
        Domains
      </v-btn>
      <v-btn
        v-if="auth"
        @click="signOut"
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
    signOut() {
      this.$store.commit("authModule/signOut");
    }
  },
  computed: {
    auth() {
      return this.$store.getters["authModule/isAuthenticated"];
    }
  }
};
</script>
