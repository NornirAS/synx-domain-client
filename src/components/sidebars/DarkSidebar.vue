<template>
  <SidebarTemplate
    :drawer="drawer"
    :permanent="permanent"
    :items="items"
    :title="title"
    :headerStyle="headerStyle"
    :listItemStyle="listItemStyle"
    :dark="dark"
    :color="bgColor"
  />
</template>

<script>
import { mdiBell, mdiAntenna } from "@mdi/js";
import SidebarTemplate from "./SidebarTemplate.vue";
export default {
  data() {
    return {
      title: "Username",
      items: [
        { title: "Services", icon: mdiAntenna, path: { name: "services" } },
        {
          title: "Notifications",
          icon: mdiBell,
          path: { name: "notifications" }
        }
      ],
      headerStyle: {
        fontSize: "20px",
        color: "#ffffff",
        paddingLeft: "0.9em"
      },
      listItemStyle: {
        fontSize: "16px",
        color: "#ffffff",
        paddingLeft: "1.5em"
      },
      bgColor: "#404B5F",
      drawer: true,
      permanent: true,
      dark: true
    };
  },
  components: {
    SidebarTemplate
  }
};
</script>
