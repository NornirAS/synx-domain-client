<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-text-field
          v-if="title === 'Service Schema'"
          label="Schema"
          single-line
          dense
          outlined
          hide-details
          v-model="serviceSchema.tagName"
          @keypress.enter="addToArray"
        ></v-text-field>
        <v-text-field
          v-else
          label="Schema"
          single-line
          dense
          outlined
          hide-details
          v-model="commandSchema"
          @keypress.enter="addToArray"
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-btn @click="addToArray()" :color="colorBlue" rounded medium dark>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="isSchema">
      <v-col md="7">
        <TableForSchema :title="title" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TableForSchema from "./TableForSchema.vue";
import FormHeader from "../FormHeader.vue";
export default {
  props: ["title", "description", "isSchema"],
  data() {
    return {
      serviceSchema: {
        tagName: "",
        linkTo: {}
      },
      commandSchema: "",
      colorBlue: "#27AAE1"
    };
  },
  components: {
    TableForSchema,
    FormHeader
  },
  methods: {
    addToArray() {
      if (this.title === "Service Schema") {
        this.$store.state.serviceForm.serviceSchema.push(this.serviceSchema);
        this.serviceSchema = {};
      } else {
        this.$store.state.serviceForm.commandSchema.push(this.commandSchema);
        this.commandSchema = "";
      }
    }
  }
};
</script>
