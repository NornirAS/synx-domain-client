<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          :label="title"
          dense
          outlined
          hide-details
          v-model="serviceImageURL"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Image",
      description: "Optional. URL to an image for your service.",
      serviceImageURL: null
    };
  },
  components: {
    FormHeader
  }
};
</script>
