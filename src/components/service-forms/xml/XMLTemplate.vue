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
        <!-- <PrimaryActionBtn
          :primaryActionBtnName="primaryActionBtnName"
          @click="addToString({ test })"
        /> -->
        <v-btn @click="addToArray()"></v-btn>
      </v-col>
      <p>{{ schema.name }}</p>
    </v-row>
    <TableForXML />
  </v-card>
</template>

<script>
import TableForXML from "./TableForXML.vue";
// import PrimaryActionBtn from "../../buttons/PrimaryActionBtn.vue";
import FormHeader from "../FormHeader.vue";
export default {
  props: ["title", "description", "primaryActionBtnName"],
  data() {
    return {
      schema: {
        name: "",
        linkTo: ""
      }
    };
  },
  components: {
    TableForXML,
    // PrimaryActionBtn,
    FormHeader
  },
  methods: {
    addToArray() {
      this.$store.state.serviceXML.push(this.schema);
      this.schema = {};
    }
  }
};
</script>
