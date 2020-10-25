<template>
  <v-app>
    <router-view name="app-bar"></router-view>
    <router-view name="dark-sidebar"></router-view>
    <router-view name="light-sidebar"></router-view>
    <v-main>
      <v-container style="height: 100%" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("tryAutoSignIn");
    if (localStorage.getItem("expirationDate")) {
      this.$store.dispatch("setSignOutTimer");
    }
  }
};
</script>

<style>
.v-main {
  background-color: rgb(235, 240, 244);
}
.v-navigation-drawer {
  top: 64px;
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
