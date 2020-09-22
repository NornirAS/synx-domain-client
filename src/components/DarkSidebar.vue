<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="mainBgColor"
    dark
    absolute
    permament
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon small> {{ mdiEarth }} </v-icon>
            Username
          </v-list-item-title>
          <v-list-item-subtitle>Server</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" :to="item.path" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mdiEarth, mdiBell, mdiAntenna } from "@mdi/js";
export default {
  data() {
    return {
      mdiEarth,
      drawer: true,
      items: [
        { title: "Services", icon: mdiAntenna, path: "/services" },
        { title: "Notifications", icon: mdiBell, path: "/" }
      ],
      mainBgColor: "#404B5F",
      permanent: true
    };
  }
};
</script>

<style>
#app > div > aside {
  padding-top: 64px;
}
</style>
