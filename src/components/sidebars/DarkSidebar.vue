<template>
  <sidebar-template :dark="dark" :color="bgColor">
    <v-list-item
      slot="list-items"
      v-for="item in items"
      :key="item.title"
      :to="item.path"
      :style="listItemStyle"
      exact
      link
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title :style="listItemTitleStyle">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </sidebar-template>
</template>

<script>
import {
  mdiAntenna,
  mdiAccountCircle,
  mdiEarth,
  mdiAtom,
  mdiSourceFork
} from "@mdi/js";
import SidebarTemplate from "./SidebarTemplate.vue";
export default {
  data() {
    return {
      mdiAccountCircle,
      mdiEarth,
      mdiAtom,
      items: [
        { title: "Domains", icon: mdiAtom, path: { name: "domains" } },
        {
          title: "Morphic Services",
          icon: mdiSourceFork,
          path: { name: "services" }
        },
        {
          title: "Network Resources",
          icon: mdiAntenna,
          path: { name: "resources" }
        },
        {
          title: "My Account",
          icon: mdiAccountCircle,
          path: { name: "account" }
        }
      ],
      headerStyle: {
        fontSize: "20px",
        color: "#ffffff",
        paddingTop: "0.2em",
        paddingLeft: "0.9em"
      },
      listItemStyle: {
        paddingLeft: "1.5em"
      },
      listItemTitleStyle: {
        fontSize: "16px",
        color: "#ffffff"
      },
      bgColor: "#404B5F",
      dark: true
    };
  },
  components: {
    SidebarTemplate
  }
};
</script>
