<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="showDrawerOnDesktop"
    :absolute="showDrawerOnDesktop"
    :temporary="showDrawer"
    :bottom="showDrawer"
    :fixed="showDrawer"
    :light="light"
    :dark="dark"
    :style="navStyle"
    :color="color"
    hide-overlay
    app
  >
    <v-list dense nav class="py-0">
      <slot name="title"></slot>
      <v-divider></v-divider>
      <slot name="list-items"></slot>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["light", "dark", "color"],
  data() {
    return {
      drawer: true,
      navStyle: {
        top: "64px",
        height: "calc(100% - 64px)"
      }
    };
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
.v-icon {
  margin-left: 0.5em;
}
</style>
