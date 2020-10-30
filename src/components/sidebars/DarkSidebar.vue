<template>
  <sidebar-template :dark="dark" :color="bgColor">
    <v-list-item slot="title" two-line>
      <v-list-item-content>
        <v-list-item-title :style="headerStyle">
          <v-icon small>{{ mdiAccountCircle }}</v-icon>
          Username: <span class="font-italic">{{ username }}</span>
        </v-list-item-title>
        <v-list-item-title :style="headerStyle">
          <v-icon small>{{ mdiEarth }}</v-icon>
          Domain: <span class="font-italic">{{ domain }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
      slot="list-items"
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
  </sidebar-template>
</template>

<script>
import {
  mdiBell,
  mdiAntenna,
  mdiAccountCircle,
  mdiEarth,
  mdiAtom
} from "@mdi/js";
import SidebarTemplate from "./SidebarTemplate.vue";
export default {
  data() {
    return {
      mdiAccountCircle,
      mdiEarth,
      mdiAtom,
      items: [
        { title: "Services", icon: mdiAntenna, path: { name: "services" } },
        {
          title: "Notifications",
          icon: mdiBell,
          path: { name: "notifications" }
        },
        { title: "Domains", icon: mdiAtom, path: { name: "domains" } }
      ],
      headerStyle: {
        fontSize: "16px",
        color: "#ffffff",
        paddingTop: "0.2em"
      },
      listItemStyle: {
        fontSize: "16px",
        color: "#ffffff",
        paddingLeft: "1.5em"
      },
      bgColor: "#404B5F",
      dark: true
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    }
  },
  components: {
    SidebarTemplate
  }
};
</script>
