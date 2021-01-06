<template>
  <v-app-bar :style="appBarStyle" app dark>
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      v-if="isMobile"
      :color="colorGrey"
      light
    ></v-app-bar-nav-icon>

    <v-spacer v-if="isMobile"></v-spacer>

    <div>
      <router-link :to="{ name: 'home' }">
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
      <v-btn
        v-if="!isMobile"
        :color="colorGrey"
        @click="signOut"
        class="text-capitalize"
        small
        text
        dark
      >
        <v-icon left>{{ mdiLogout }}</v-icon> Log Out
      </v-btn>
      <v-btn v-else @click="signOut" :color="colorGrey" small icon dark>
        <v-icon>{{ mdiLogout }}</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mdiLogout } from "@mdi/js";
export default {
  data() {
    return {
      drawer: false,
      mdiLogout,
      appBarStyle: {
        backgroundColor: "#ffffff",
        width: "100%",
        left: "0"
      },
      colorGrey: "#58595b"
    };
  },
  methods: {
    signOut() {
      this.$store.commit("authModule/signOut");
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    showDrawer() {
      return this.$store.state.showDrawerOnMobile;
    }
  },
  watch: {
    drawer(newValue) {
      this.$store.commit("showDrawerOnMobile", newValue);
    },
    showDrawer(newValue) {
      this.drawer = newValue;
    }
  }
};
</script>
