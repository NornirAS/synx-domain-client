<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <router-view name="dark-sidebar"></router-view>
        <router-view name="light-sidebar"></router-view>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>

<style>
.v-main {
  background-color: rgb(235, 240, 244);
}
.container {
  padding: 1.5em 20em 0 20em;
}
.v-card {
  margin: 1em 0 1em 0;
  padding: 0.5em 2em 1em 2em;
  flex-grow: 1;
}
</style>
