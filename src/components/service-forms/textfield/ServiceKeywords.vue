<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" sm="6">
        <v-text-field
          :label="title"
          dense
          outlined
          hide-details
          v-model="serviceKeyword"
          @keypress.enter="addKeyword"
        ></v-text-field>
      </v-col>
      <v-col cols="4" sm="6">
        <v-btn @click="addKeyword" :color="colorBlue" rounded medium dark>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-chip
      v-for="(item, index) in keywords"
      :key="item"
      @click="removeKeyword(index)"
      :style="chipStyle"
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
      colorBlue: "#27AAE1",
      chipStyle: {
        color: "#27AAE1",
        borderColor: "#27AAE1",
        margin: "0 4px 10px 4px"
      }
    };
  },
  methods: {
    addKeyword() {
      this.$store.commit("serviceModule/addKeyword", this.serviceKeyword);
      this.serviceKeyword = "";
    },
    removeKeyword(index) {
      this.$store.commit("serviceModule/removeKeyword", index);
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
