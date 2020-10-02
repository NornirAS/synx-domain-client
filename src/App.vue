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
  margin: 1em 0 1em 0;
  padding: 0.5em 2em 1em 2em;
  flex-grow: 1;
}
</style>
