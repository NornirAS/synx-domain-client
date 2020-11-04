<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="instances"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["instances"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Domain",
          align: "start",
          value: "domain"
        },
        { text: "Service", value: "service" },
        { text: "Instance", value: "instance" },
        { text: "Change owner", value: "changeOwner", sortable: false },
        { text: "Map ID", value: "mapID", sortable: false },
        { text: "Kill Session", value: "killSession", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ]
    };
  }
};
</script>
