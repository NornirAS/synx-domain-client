<template>
  <v-navigation-drawer
    :permanent="permanent"
    :drawer="drawer"
    :light="light"
    :dark="dark"
    :style="navStyle"
    :color="color"
    absolute
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
      navStyle: {
        top: "64px",
        height: "100%"
      },
      drawer: true,
      permanent: true
    };
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
