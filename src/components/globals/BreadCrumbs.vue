<template>
  <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
</template>

<script>
import _ from "lodash";
export default {
  methods: {
    // remove slash at the end of route
    removeSlash(route) {
      if (route.slice(-1) === "/") {
        return route.slice(0, -1);
      } else {
        return route;
      }
    }
  },
  computed: {
    crumbs() {
      const crumbs = [];
      this.$route.matched.forEach(route => {
        if (route.path !== "" && !_.isEmpty(route.meta)) {
          const obj = {
            text: route.meta.breadcrumb,
            to: route.path + "/",
            "active-class":
              this.removeSlash(this.$route.path) !== route.path
                ? "v-breadcrumbs__item"
                : "v-breadcrumbs__item--disabled"
          };
          crumbs.push(obj);
        }
      });
      return crumbs;
    }
  }
};
</script>

<style scoped>
.v-breadcrumbs {
  padding: 0;
}
</style>
