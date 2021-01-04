<template>
  <v-app>
    <router-view name="app-bar"></router-view>
    <router-view name="dark-sidebar"></router-view>
    <router-view name="light-sidebar"></router-view>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <router-view name="footer-bar"></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("authModule/tryAutoSignIn");
    if (localStorage.getItem("expirationDate")) {
      this.$store.dispatch("authModule/setSignOutTimer");
    }
    this.$store.commit("isMobile", this.isMobile);
  },
  computed: {
    notAuth() {
      return this.$store.getters.isAuthenticated;
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    notAuth(newValue) {
      if (newValue === false) {
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
.v-application {
  font-family: "Open Sans", sans-serif !important;
}
.v-toolbar__content {
  margin: 0 1em;
}
.nav-buttons {
  margin: 0 1em;
}
.v-main {
  height: 100vh;
  background-color: rgb(235, 240, 244);
}
.container.container--fluid {
  height: 100%;
  padding: 0 12px;
  overflow: scroll;
}
.v-card {
  margin: 0 0 12px 0;
  padding: 0 1em;
  flex-grow: 1;
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
