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
          single-line
          dense
          outlined
          hide-details
          v-model="serviceKeyword"
          @keypress.enter="addKeyword"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addKeyword" :color="colorBlue" rounded medium dark>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-chip
      v-for="(item, index) in keywords"
      :key="item"
      @click="removeKeyword(index)"
      :color="colorBlue"
      class="ma-2"
      outlined
    >
      {{ item }}
    </v-chip>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Keywords",
      description: "Search keywords to easily discover your service.",
      serviceKeyword: "",
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    addKeyword() {
      this.serviceModule.serviceForm.keywords.push(this.serviceKeyword);
      this.serviceKeyword = "";
    },
    removeKeyword(index) {
      this.serviceModule.serviceForm.keywords.splice(index, 1);
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    keywords() {
      return this.serviceModule.serviceForm.keywords;
    }
  },
  components: {
    FormHeader
  }
};
</script>
