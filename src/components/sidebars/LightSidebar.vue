<template>
  <sidebar-template :light="light">
    <v-list-item slot="title" two-line>
      <v-list-item-content>
        <v-list-item-title :style="headerStyle">
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
        <v-list-item-title :style="listItemTitleStyle">{{
          item.title
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </sidebar-template>
</template>

<script>
import { mdiCircleSmall } from "@mdi/js";
import SidebarTemplate from "./SidebarTemplate.vue";
export default {
  data() {
    return {
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
          title: "Post Inline Script",
          icon: mdiCircleSmall,
          path: { name: "home" }
        },
        {
          title: "Pre Inline Script",
          icon: mdiCircleSmall,
          path: { name: "home" }
        }
      ],
      headerStyle: {
        fontSize: "20px",
        color: "#58595b",
        paddingTop: "0.2em",
        paddingLeft: "0.9em"
      },
      listItemStyle: {
        paddingLeft: "1.5em"
      },
      listItemTitleStyle: {
        fontSize: "16px",
        color: "#9b9b9b"
      },
      light: true
    };
  },
  computed: {
    title() {
      return this.$store.state.sidebarsModule.lightSideBarTitle;
    }
  },
  components: {
    SidebarTemplate
  }
};
</script>
