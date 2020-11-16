<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          hide-details
          name="input-7-4"
          label="Description"
          v-model="schemaDescription"
          @blur="addSchemaDescription"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Schema Description",
      description: "Describe your service and command schema",
      schemaDescription: ""
    };
  },
  mounted() {
    this.schemaDescription = this.serviceModule.serviceForm.schemaDescription;
  },
  methods: {
    addSchemaDescription() {
      this.$store.commit(
        "serviceModule/addSchemaDescription",
        this.schemaDescription
      );
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    }
  },
  components: {
    FormHeader
  }
};
</script>
