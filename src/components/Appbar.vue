<template>
  <v-app-bar app dark :style="appBarStyle">
    <div class="d-flex align-center">
      <router-link :to="{ name: 'services' }">
        <v-img
          alt="Cioty"
          class="shrink mr-2"
          contain
          src="../assets/CIOTY-final-Logo.png"
          transition="scale-transition"
          width="50"
        />
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <div>
      <v-btn class="nav-buttons" color="#58595B" icon rounded outlined small>
        <v-icon small> {{ bell }} </v-icon>
      </v-btn>

      <v-btn class="nav-buttons" color="#58595B" icon rounded outlined small>
        <v-icon rounded outlined> {{ account }} </v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mdiAccount, mdiBell } from "@mdi/js";
export default {
  data() {
    return {
      account: mdiAccount,
      bell: mdiBell,
      appBarStyle: {
        backgroundColor: "#ffffff",
        width: "100%",
        left: "0"
      }
    };
  }
};
</script>

<style>
.v-toolbar__content {
  margin: 0 1em;
}
.nav-buttons {
  margin: 0 1em;
}
</style>
