<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-text-field
      :label="title"
      single-line
      dense
      outlined
      hide-details
      v-model="serviceImageURL"
    ></v-text-field>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Image",
      description: "Optional. URL to an image for your service.",
      serviceImageURL: ""
    };
  },
  components: {
    FormHeader
  }
};
</script>
