<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-row>
      <v-col md="6">
        <v-text-field
          label="Schema"
          single-line
          dense
          outlined
          hide-details
          v-model="schema.name"
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-btn @click="addToArray()" :color="colorBlue" rounded medium dark>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <TableForXML :title="title" />
  </v-card>
</template>

<script>
import TableForXML from "./TableForXML.vue";
import FormHeader from "../FormHeader.vue";
export default {
  props: ["title", "description", "primaryActionBtnName"],
  data() {
    return {
      schema: {
        name: "",
        linkTo: {}
      },
      colorBlue: "#27AAE1"
    };
  },
  components: {
    TableForXML,
    FormHeader
  },
  methods: {
    addToArray() {
      if (this.title === "Service XML") {
        this.$store.state.serviceForm.serviceXML.push(this.schema);
        this.schema = {};
      } else {
        this.$store.state.serviceForm.commandXML.push(this.schema);
        this.schema = {};
      }
    }
  }
};
</script>
