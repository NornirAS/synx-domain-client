<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <v-container fluid>
        <router-view><Services /></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Services from "./views/Services.vue";
export default {
  name: "App",

  components: {
    Header,
    Sidebar,
    Services
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
</style>
