<template>
  <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    crumbs() {
      const routesWithBreadcrumbs = this.$route.matched.filter(route => {
        const hasBreadcrumb = route.meta.breadcrumb !== undefined;
        return hasBreadcrumb;
      });
      return routesWithBreadcrumbs.map(route => {
        const routeNameOrPathIfNoRouteName = !route.name
          ? route.path
          : { name: route.name };
        const currentRouteEqualMatchedRoute = this.$route.name === route.name;
        const activeClass = currentRouteEqualMatchedRoute
          ? "v-breadcrumbs__item--disabled"
          : "v-breadcrumbs__item";
        return {
          text: route.meta.breadcrumb,
          to: routeNameOrPathIfNoRouteName,
          "active-class": activeClass
        };
      });
    }
  }
};
</script>

<style scoped>
.v-breadcrumbs {
  padding: 0;
}
</style>
