<template>
  <form-input-card>
    <div slot="title">Service Description</div>
    <div slot="subtitle">
      In order for the service to be found with Draape and used by others, a
      good description is recommended. What kind of data does the service
      provide?
    </div>
    <v-textarea
      v-model="description"
      @blur="addDescription"
      :rules="descriptionRules"
      :counter="512"
      name="description"
      label="Describe your service"
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
      description: "",
      descriptionRules: [
        v => !!v || "Description is required",
        v =>
          (v && v.length) <= 512 || "Description must be maximum 512 character"
      ]
    };
  },
  methods: {
    ...mapMutations("micropageFormModule", ["addServiceDescription"]),
    addDescription() {
      this.addServiceDescription(this.description);
    }
  },
  computed: {
    ...mapState("micropageFormModule", ["serviceDescription"])
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
