<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="mainBgColor"
    light
    absolute
    permament
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title :style="headerStyle">
            New Service
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" :to="item.path" link>
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
  data() {
    return {
      drawer: true,
      items: [
        { title: "Basic", path: "/" },
        { title: "WebJS", path: "/" },
        { title: "Service Post MasterScript", path: "/" },
        { title: "Service Pre MasterScript", path: "/" },
        { title: "Micro Page", path: "/" }
      ],
      mainBgColor: "white",
      headerStyle: {
        fontSize: "20px",
        color: "#58595b",
        paddingLeft: "0.5em"
      },
      listItemStyle: {
        fontSize: "16px",
        color: "#9b9b9b",
        paddingLeft: "1em"
      },
      permanent: true
    };
  }
};
</script>

<style scope>
#app > div > main > div > div > div > aside {
  padding-top: 0.5em;
}
</style>
