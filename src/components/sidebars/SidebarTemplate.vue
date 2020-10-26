<template>
  <v-navigation-drawer
    :permanent="showDrawerOnDesktop"
    :light="light"
    :dark="dark"
    :style="navStyle"
    :color="color"
    v-model="drawer"
    :temporary="drawer"
    :bottom="drawer"
    absolute
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
      drawer: null,
      navStyle: {
        top: "64px",
        height: "100%"
      }
    };
  },
  computed: {
    showDrawerOnDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    showDrawerOnMobile() {
      return this.$store.state.showDrawerOnMobile;
    }
  },
  watch: {
    showDrawerOnMobile(NewValue) {
      this.drawer = NewValue;
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
