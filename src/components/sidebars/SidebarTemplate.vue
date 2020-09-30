<template>
  <v-navigation-drawer
    :permanent="permanent"
    :drawer="drawer"
    :color="color"
    :light="light"
    :dark="dark"
    :style="navStyle"
    absolute
    app
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title :style="headerStyle">
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        exact
        link
      >
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-item-content>
          <v-list-item-title :style="listItemStyle">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: [
    "drawer",
    "color",
    "permanent",
    "title",
    "items",
    "headerStyle",
    "listItemStyle",
    "light",
    "dark"
  ],
  data() {
    return {
      navStyle: {
        top: "64px",
        height: "100%"
      }
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
