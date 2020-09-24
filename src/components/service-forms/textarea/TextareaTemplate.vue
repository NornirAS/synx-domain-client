<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-textarea
      outlined
      hide-details
      name="input-7-4"
      label="Description"
      value=""
    ></v-textarea>
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
