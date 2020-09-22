<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
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
  padding: 1.5em 10em 0 20em;
}
</style>
