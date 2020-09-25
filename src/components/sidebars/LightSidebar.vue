<template>
  <SidebarTemplate
    :drawer="drawer"
    :permanent="permanent"
    :items="items"
    :title="title"
    :headerStyle="headerStyle"
    :listItemStyle="listItemStyle"
    :light="light"
  />
</template>

<script>
import { mdiCircleSmall } from "@mdi/js";
import SidebarTemplate from "./SidebarTemplate.vue";
export default {
  data() {
    return {
      title: "New Service",
      items: [
        {
          title: "Basic",
          icon: mdiCircleSmall,
          path: { name: "home" }
        },
        {
          title: "WebJS",
          icon: mdiCircleSmall,
          path: { name: "home" }
        },
        {
          title: "Post MasterScript",
          icon: mdiCircleSmall,
          path: { name: "home" }
        },
        {
          title: "Pre MasterScript",
          icon: mdiCircleSmall,
          path: { name: "home" }
        },
        {
          title: "Micro Page",
          icon: mdiCircleSmall,
          path: { name: "home" }
        }
      ],
      headerStyle: {
        fontSize: "20px",
        color: "#58595b",
        paddingLeft: "0.9em"
      },
      listItemStyle: {
        fontSize: "16px",
        color: "#9b9b9b",
        paddingLeft: "1.5em"
      },
      drawer: true,
      permanent: true,
      light: true
    };
  },
  components: {
    SidebarTemplate
  }
};
</script>
