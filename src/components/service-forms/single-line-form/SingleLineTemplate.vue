<template>
  <v-card outlined>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
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
export default {
  props: ["title", "description"]
};
</script>
