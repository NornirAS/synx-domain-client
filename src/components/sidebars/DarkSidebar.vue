<template>
  <sidebar-template :dark="dark" :color="bgColor">
    <v-list-item slot="title" two-line>
      <v-list-item-content>
        <v-list-item-title :style="headerStyle">
          <v-icon medium>{{ mdiEarth }}</v-icon>
          Domain: <span class="font-italic">{{ domain }}</span>
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
  mdiArrangeSendBackward
} from "@mdi/js";
import SidebarTemplate from "./SidebarTemplate.vue";
export default {
  data() {
    return {
      mdiAccountCircle,
      mdiEarth,
      mdiAtom,
      mdiArrangeSendBackward,
      items: [
        { title: "Domains", icon: mdiAtom, path: { name: "domains" } },
        { title: "Services", icon: mdiAntenna, path: { name: "services" } },
        {
          title: "Resources",
          icon: mdiArrangeSendBackward,
          path: { name: "resources" }
        },
        {
          title: "Account",
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
  computed: {
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    }
  },
  components: {
    SidebarTemplate
  }
};
</script>
