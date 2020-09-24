<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-text-field
      :label="title"
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
  props: ["title", "description"],
  components: {
    FormHeader
  }
};
</script>
