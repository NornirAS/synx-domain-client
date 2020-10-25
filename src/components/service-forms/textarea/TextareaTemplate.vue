<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          hide-details
          name="input-7-4"
          label="Description"
          value=""
          v-model="test"
        ></v-textarea>
      </v-col>
    </v-row>
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
