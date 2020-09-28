<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-text-field
      :label="title"
      single-line
      dense
      outlined
      hide-details
      v-model="test"
    ></v-text-field>
    <p>{{ test }}</p>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  props: ["title", "description"],
  data() {
    return {
      test: ""
    };
  },
  components: {
    FormHeader
  }
};
</script>
