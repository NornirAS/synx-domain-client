<template>
  <v-app-bar app dark :style="appBarStyle">
    <div class="d-flex align-center">
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
      <v-btn class="nav-buttons" color="#58595B" icon rounded outlined small>
        <v-icon small> {{ bell }} </v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="nav-buttons"
            color="#58595B"
            icon
            rounded
            outlined
            small
          >
            <v-icon rounded outlined> {{ account }} </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.action"
            :to="item.path"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
      },
      items: [
        {
          title: "Logout",
          action: this.signOut
        }
      ]
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    }
  },
  computed: {
    notAuth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  watch: {
    notAuth(newValue) {
      if (newValue === false) {
        this.$router.push({ name: "home" });
      }
    }
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
