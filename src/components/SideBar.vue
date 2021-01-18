<template>
  <v-navigation-drawer v-model="drawer" light hide-overlay app>
    <router-link :to="{ name: 'home' }">
      <v-img
        alt="Cioty"
        src="../assets/CIOTY-final-Logo.png"
        transition="scale-transition"
        class="sidebar-logo"
      />
    </router-link>
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        exact
        link
      >
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
          <v-btn @click="signOut" class="text-capitalize" rounded small dark>
            <v-icon left>{{ mdiLogout }}</v-icon> Log Out
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div align="center" class="synx-hive-power subtitle-1">
        <img
          align="center"
          alt="SynxDomainLogo"
          src="../assets/synx-domain-logo.png"
          width="20px"
        />
        Powered By Synx Hive
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
        { title: "Domains", icon: mdiWeb, path: { name: "domains" } },
        {
          title: "Morphic Services",
          icon: mdiSourceFork,
          path: { name: "services" }
        },
        {
          title: "Ghosts",
          icon: mdiAntenna,
          path: { name: "resources" }
        },
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
      this.$store.commit("authModule/signOut");
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
.v-list {
  padding: 0;
}
.v-list-item {
  padding: 0 2em;
}
.v-list-item--active {
  color: #404b5f;
}
.body-1 {
  color: #404b5f;
}
.subtitle-2 {
  color: #404b5f;
}
.sidebar-logo {
  width: 100px;
  margin: 3em;
}
.synx-hive-power {
  margin-bottom: 3em;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text) {
  background-color: #27aae1;
}
</style>
