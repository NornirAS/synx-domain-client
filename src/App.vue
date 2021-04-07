<template>
  <v-app>
    <router-view name="side-bar"></router-view>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  created() {
    if (sessionStorage.getItem("token")) {
      this.addTokenFromStorage();
    }
    if (sessionStorage.getItem("username")) {
      this.addUsernameFromStorage();
    }
    if (sessionStorage.getItem("domains")) {
      this.addDomainsFromStorage();
    }
    if (sessionStorage.getItem("services")) {
      this.addServicesFromStorage();
    }
  },
  methods: {
    ...mapActions("authentication", [
      "addTokenFromStorage",
      "addUsernameFromStorage"
    ]),
    ...mapActions("domains", ["addDomainsFromStorage"]),
    ...mapActions("services", ["addServicesFromStorage"])
  },
  computed: {
    ...mapGetters("authentication", ["isAuthenticated"])
  },
  watch: {
    isAuthenticated(newValue) {
      const isHome = this.$route.name === "home";
      if (newValue === false && !isHome) {
        this.$router.push({ name: "home" });
      }
    }
  }
};
</script>

<style>
.v-main {
  height: 100vh;
  background-color: var(--v-secondary-base);
}
.container.container--fluid {
  height: 100%;
  padding: 0 12px;
  overflow: scroll;
}
.v-card {
  margin-bottom: 16px;
  padding: 24px 24px 16px 24px;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  transition-delay: 3600s;
}
@media screen and (max-width: 960px) {
  .v-main {
    height: 100%;
  }
}
</style>
