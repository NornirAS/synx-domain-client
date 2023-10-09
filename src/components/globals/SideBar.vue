<template>
  <v-navigation-drawer v-model="drawer" light hide-overlay app>
    <router-link :to="{ name: 'home' }">
      <v-img
        alt="cioty"
        src="../../assets/main-logo.webp"
        transition="scale-transition"
        class="ma-12"
      />
    </router-link>
    <v-list class="pa-0" nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.path">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-1">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click="signOut" color="primary">
            <v-icon left>{{ mdiLogout }}</v-icon> Log Out
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div align="center" class="mb-12 subtitle-1">
        Powered By
        <img
          align="center"
          alt="synx-domain-logo"
          src="../../assets/synx-domain-logo.webp"
          height="20px"
        />
        Synx Hive
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiAntenna,
  mdiAccountCircle,
  mdiWeb,
  mdiSourceFork,
  mdiLogout
} from "@mdi/js";
export default {
  data() {
    return {
      mdiLogout,
      drawer: true,
      items: [
        {
          title: "Morphic Services",
          icon: mdiSourceFork,
          path: { name: "services" }
        },
        {
          title: "Ghosts",
          icon: mdiAntenna,
          path: { name: "ghosts" }
        },
        { title: "Domains", icon: mdiWeb, path: { name: "domains" } },
        {
          title: "My Account",
          icon: mdiAccountCircle,
          path: { name: "account" }
        }
      ]
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("authentication/signOut");
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    showDrawerOnDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    showDrawer() {
      return this.$store.state.showDrawerOnMobile;
    }
  },
  watch: {
    showDrawer(newValue) {
      this.drawer = newValue;
    }
  }
};
</script>

<style scoped>
a {
  color: var(--v-primary-base) !important;
}
.v-list-item {
  padding: 0 24px;
}
.v-list-item--active {
  border-left: 8px solid;
  border-radius: 0;
}
</style>
