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
          v-model="pictureURL"
          @blur="addPictureURL"
          :label="title"
          dense
          outlined
          hide-details
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
      pictureURL: null
    };
  },
  methods: {
    addPictureURL() {
      this.$store.commit("serviceModule/addPictureURL", this.pictureURL);
    }
  },
  components: {
    FormHeader
  }
};
</script>
