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
          :value="getServiceDescription"
          v-model="serviceDescription"
          @blur="addServiceDescription"
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
      title: "Description",
      description:
        "In order for the service to be found with Draape and used by others, agood description is recommended. What kind of data does the service provide?",
      serviceDescription: ""
    };
  },
  methods: {
    addServiceDescription() {
      this.serviceModule.serviceForm.description = this.serviceDescription;
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    getServiceDescription() {
      return this.serviceModule.serviceForm.description;
    }
  },
  components: {
    FormHeader
  }
};
</script>
