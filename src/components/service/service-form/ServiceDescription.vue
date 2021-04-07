<template>
  <form-input-card>
    <div slot="title">Description</div>
    <div slot="subtitle">
      Enter service description so you will remember you services later.
    </div>
    <v-textarea
      v-model="serviceDescription"
      @blur="addDescription(serviceDescription)"
      :rules="descriptionRules"
      :counter="512"
      name="description"
      label="Service description"
      type="text"
      error-count="1"
      slot="action"
      required
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceDescription: "",
      descriptionRules: [
        v => !!v || "Description is required",
        v =>
          (v && v.length) <= 512 || "Description must be maximum 512 character"
      ]
    };
  },
  mounted() {
    this.serviceDescription = this.description;
  },
  methods: {
    ...mapMutations("serviceForm", ["addDescription"])
  },
  computed: {
    ...mapState("serviceForm", ["description"])
  },
  components: {
    FormInputCard
  }
};
</script>
