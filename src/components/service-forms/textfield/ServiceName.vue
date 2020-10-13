<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-text-field
      :label="title"
      single-line
      dense
      outlined
      hide-details
      v-model="serviceName"
      @blur="addServiceName"
    ></v-text-field>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Service Name",
      description: "Typically what the service/object do.",
      serviceName: ""
    };
  },
  components: {
    FormHeader
  },
  methods: {
    addServiceName() {
      this.$store.state.serviceForm.serviceName = this.serviceName;
    }
  }
};
</script>
