<template>
  <input-card>
    <div slot="title">Service Description*</div>
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
  </input-card>
</template>

<script>
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
  mounted() {
    this.description = this.serviceDescription;
  },
  methods: {
    addDescription() {
      this.$store.commit(
        "micropageFormModule/addDescription",
        this.description
      );
    }
  },
  computed: {
    serviceDescription() {
      return this.$store.state.micropageFormModule.serviceDescription;
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
