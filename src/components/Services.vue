<template>
  <div :style="divStyle">
    <v-row justify="space-between">
      <span style="font-size: 24px">
        Services
        <v-icon :color="lightBlue">{{ mdiInformationOutline }}</v-icon>
      </span>
      <v-btn :color="lightBlue" depressed rounded medium dark>
        <v-icon>{{ mdiPlus }}</v-icon>
        New Service
      </v-btn>
    </v-row>
    <br />
    <v-row>
      <v-checkbox :style="checkboxStyle"></v-checkbox>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :style="filterBtnStyle" rounded dark v-bind="attrs" v-on="on">
            Groups
            <v-icon>{{ mdiChevronDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in groups" :key="item">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :style="filterBtnStyle" rounded dark v-bind="attrs" v-on="on">
            Sort By
            <v-icon>{{ mdiChevronDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in sortList" :key="item">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        :style="searchBarStyle"
      ></v-text-field>
    </v-row>
    <hr />
  </div>
</template>

<script>
import { mdiInformationOutline, mdiPlus, mdiChevronDown } from "@mdi/js";
export default {
  data() {
    return {
      search: "",
      groups: ["test1", "test2"],
      sortList: ["newest", "oldest"],
      mdiInformationOutline,
      mdiPlus,
      mdiChevronDown,
      divStyle: {
        margin: "1.5em 20em 0 20em"
      },
      checkboxStyle: {
        marginTop: "0",
        paddingTop: "0.5em"
      },
      searchBarStyle: {
        marginTop: "0",
        padding: "0 0 0 1em"
      },
      filterBtnStyle: {
        margin: "0 0.75em",
        backgroundColor: "#404B5F"
      },
      lightBlue: "#27AAE1"
    };
  }
};
</script>
