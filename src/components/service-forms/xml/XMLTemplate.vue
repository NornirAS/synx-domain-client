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
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <PrimaryActionBtn :primaryActionBtnName="primaryActionBtnName" />
      </v-col>
    </v-row>
    <TableForXML />
  </v-card>
</template>

<script>
import TableForXML from "./TableForXML.vue";
import PrimaryActionBtn from "../../buttons/PrimaryActionBtn.vue";
import FormHeader from "../FormHeader.vue";
export default {
  props: ["title", "description", "primaryActionBtnName"],
  components: {
    TableForXML,
    PrimaryActionBtn,
    FormHeader
  }
};
</script>
