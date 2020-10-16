<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-text-field
      v-model="serviceName"
      @blur="addServiceName"
      :label="title"
      :disabled="isEditPage"
      single-line
      dense
      outlined
      hide-details
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
  mounted() {
    this.serviceName = this.$store.state.serviceForm.serviceName;
  },
  computed: {
    isEditPage() {
      return this.$store.state.sideBarTitle === "Edit Service" ? true : false;
    }
  },
  methods: {
    addServiceName() {
      this.$store.state.serviceForm.serviceName = this.serviceName;
    }
  },
  components: {
    FormHeader
  }
};
</script>
