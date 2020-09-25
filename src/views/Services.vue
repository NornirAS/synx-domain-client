<template>
  <div>
    <v-row justify="space-between">
      <h2>
        Services
        <v-icon :color="colorBlue">{{ mdiInformationOutline }}</v-icon>
      </h2>
      <PrimaryActionBtn
        :primaryActionBtnName="primaryActionBtnName"
        :path="createServicePath"
      />
    </v-row>
    <br />
    <v-row>
      <Checkbox :style="checkBoxStyle" />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :color="colorGrey"
            :style="filterBtnStyle"
            rounded
            dark
            v-bind="attrs"
            v-on="on"
          >
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
          <v-btn
            :color="colorGrey"
            :style="filterBtnStyle"
            rounded
            dark
            v-bind="attrs"
            v-on="on"
          >
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
      <v-btn :color="colorRed" :style="filterBtnStyle" rounded dark>
        Delete
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :color="colorGrey"
            :style="filterBtnStyle"
            rounded
            dark
            v-bind="attrs"
            v-on="on"
          >
            Move To
            <v-icon>{{ mdiChevronDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in sortList" :key="item">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <hr />
    <Service />
  </div>
</template>

<script>
import { mdiInformationOutline, mdiChevronDown } from "@mdi/js";
import PrimaryActionBtn from "../components/buttons/PrimaryActionBtn.vue";
import Service from "../components/service/Service.vue";
import Checkbox from "../components/controls/Checkbox.vue";
export default {
  data() {
    return {
      search: "",
      groups: ["test1", "test2"],
      sortList: ["newest", "oldest"],
      mdiInformationOutline,
      mdiChevronDown,
      searchBarStyle: {
        marginTop: "0",
        padding: "0 0.5em 0 0.5em"
      },
      checkBoxStyle: {
        margin: "0",
        paddingTop: "0.5em"
      },
      filterBtnStyle: {
        margin: "0 0.75em"
      },
      colorBlue: "#27AAE1",
      colorRed: "#FF6666",
      colorGrey: "#404B5F",
      primaryActionBtnName: "Create Service",
      createServicePath: { name: "createService" },
    };
  },
  components: {
    PrimaryActionBtn,
    Service,
    Checkbox
  }
};
</script>
