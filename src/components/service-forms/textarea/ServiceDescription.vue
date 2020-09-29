<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-textarea
      outlined
      hide-details
      name="input-7-4"
      label="Description"
      value=""
      v-model="serviceDescription"
      @blur="addServiceDescription"
    ></v-textarea>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Service Description",
      description:
        "In order for the service to be found with Draape and used by others, agood description is recommended. What kind of data does the service provide?",
      serviceDescription: ""
    };
  },
  components: {
    FormHeader
  },
  methods: {
    addServiceDescription() {
      this.$store.state.serviceForm.description = this.serviceDescription;
    }
  }
};
</script>
