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
export default {
  name: "App",
  created() {
    if (sessionStorage.getItem("token")) {
      this.$store.dispatch("authModule/addTokenFromStorage");
    }
    if (sessionStorage.getItem("username")) {
      this.$store.dispatch("authModule/addUsernameFromStorage");
    }
    if (sessionStorage.getItem("domains")) {
      this.$store.dispatch("domainsModule/addDomainsFromStorage");
    }
    if (sessionStorage.getItem("services")) {
      this.$store.dispatch("servicesModule/addServicesFromStorage");
    }
    if (localStorage.getItem("expirationDate")) {
      this.$store.dispatch("authModule/setSignOutTimer");
    }
    this.$store.commit("isMobile", this.isMobile);
  },
  computed: {
    isAuth() {
      return this.$store.getters["authModule/isAuthenticated"];
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    isAuth(newValue) {
      const isHome = this.$route.name === "home";
      if (newValue === false && !isHome) {
        this.$router.push({ name: "home" });
      }
    },
    isMobile() {
      this.$store.commit("isMobile", this.isMobile);
    },
    successMessage(newValue) {
      if (newValue !== "") {
        console.log(newValue);
      }
    }
  }
};
</script>

<style>
.v-main {
  height: 100vh;
  background-color: var(--v-background-base);
}
.display-1 {
  color: var(--v-secondary-base);
}
.title {
  color: var(--v-secondary-base);
}
.subtitle-2 {
  color: var(--v-secondary-base);
}
.body-1 {
  color: var(--v-secondary-base);
}
.v-expansion-panel-header {
  color: var(--v-secondary-base);
}
.v-list-item--active {
  color: var(--v-secondary-base);
}
.container.container--fluid {
  height: 100%;
  padding: 0 12px;
  overflow: scroll;
}
.v-card {
  margin-bottom: 16px;
  /* padding: 1em 1.5em; */
  padding: 24px 24px 16px 24px;
  flex-grow: 1;
}
.theme--light.v-card {
  color: var(--v-secondary-base) !important;
}
.v-card__title {
  text-align: justify !important;
  word-break: keep-all !important;
}
.theme--light.v-label {
  color: #58595b;
  padding-left: 0.3em;
}
.theme--light.v-input {
  color: #58595b !important;
}
.theme--dark.v-label {
  font-style: italic;
  padding-left: 0.5em;
  padding-right: 0.1em;
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
