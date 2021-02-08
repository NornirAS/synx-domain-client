<template>
  <input-card>
    <div slot="title">Schema Description*</div>
    <div slot="subtitle">
      Want other humans to get data from your service? Remember to add
      information about which elements they must link to.
    </div>
    <v-textarea
      v-model="description"
      @blur="addDescription"
      :rules="descriptionRules"
      :counter="512"
      name="description"
      label="Describe your schema"
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
    this.description = this.mergeSchemas;
  },
  methods: {
    addDescription() {
      this.$store.commit(
        "serviceFormModule/addSchemaDescription",
        this.description
      );
    }
  },
  computed: {
    serviceSchema() {
      return this.$store.state.serviceFormModule.schema;
    },
    commandSchema() {
      return this.$store.state.serviceFormModule.command;
    },
    mergeSchemas() {
      return `Service Schema\n${this.serviceSchema}\nCommand Schema\n${this.commandSchema}`;
    }
  },
  watch: {
    mergeSchemas(newValue) {
      this.description = newValue;
      this.addDescription();
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
