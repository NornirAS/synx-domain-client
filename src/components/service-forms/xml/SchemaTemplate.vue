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
          dense
          outlined
          hide-details
          v-model="serviceSchema.tagName"
          @keypress.enter="addToArray"
        ></v-text-field>
        <v-text-field
          v-else
          label="Schema"
          dense
          outlined
          hide-details
          v-model="commandSchema"
          @keypress.enter="addToArray"
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-btn @click="addToArray" :color="colorBlue" rounded medium dark>
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
        tagName: null,
        linkTo: {}
      },
      commandSchema: null,
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
        this.serviceSchema.linkTo = Object.assign(
          {},
          this.serviceSchema.linkTo,
          {}
        );
        this.$store.commit(
          "serviceModule/addServiceSchema",
          this.serviceSchema
        );
        this.serviceSchema = {};
      } else {
        this.$store.commit(
          "serviceModule/addCommandSchema",
          this.commandSchema
        );
        this.commandSchema = null;
      }
    }
  }
};
</script>
