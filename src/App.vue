<template>
  <v-app>
    <router-view name="app-bar"></router-view>
    <router-view name="dark-sidebar"></router-view>
    <router-view name="light-sidebar"></router-view>
    <v-main>
      <v-container :style="mainContainerStyle" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <router-view name="footer-bar"></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      mainContainerStyle: {
        height: "100%",
        overflow: "scroll"
      }
    };
  },
  created() {
    this.$store.dispatch("tryAutoSignIn");
    if (localStorage.getItem("expirationDate")) {
      this.$store.dispatch("setSignOutTimer");
    }
    this.$store.commit("isMobile", this.isMobile);
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  watch: {
    isMobile() {
      this.$store.commit("isMobile", this.isMobile);
    }
  }
};
</script>

<style>
.v-main {
  height: 100vh;
  background-color: rgb(235, 240, 244);
}
.v-card {
  margin-top: 0.5em;
  padding: 0 1em;
  flex-grow: 1;
}
.theme--light.v-label {
  color: #58595b !important;
}
</style>
