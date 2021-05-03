<template>
  <form-input-card>
    <div slot="title">Service Description</div>
    <div slot="subtitle">
      Enter your description of your service {{ service }}. This information
      will be available for service engines and will be visible at
      {{ url }} when someone does a normal get request.
    </div>
    <v-textarea
      v-model="description"
      @blur="addServiceDescription(description)"
      :rules="descriptionRules"
      :counter="512"
      name="description"
      label="Describe your service for the public"
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
import FormInputCard from "../../globals/FormInputCard";
export default {
  props: ["service", "url"],
  data() {
    return {
      description: "",
      descriptionRules: [
        v => !!v || "Description is required",
        v =>
          (v && v.length) <= 512 || "Description must be maximum 512 character"
      ]
    };
  },
  methods: {
    ...mapMutations("micropageForm", ["addServiceDescription"])
  },
  computed: {
    ...mapState("micropageForm", ["serviceDescription"])
  },
  watch: {
    serviceDescription(newValue) {
      this.description = newValue;
    }
  },
  components: {
    FormInputCard
  }
};
</script>
