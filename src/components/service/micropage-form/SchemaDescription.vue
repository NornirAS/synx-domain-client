<template>
  <form-input-card>
    <div slot="title">Schema Description</div>
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
    ...mapMutations("micropageFormModule", ["addSchemaDescription"]),
    addDescription() {
      this.addSchemaDescription(this.description);
    }
  },
  computed: {
    ...mapState("micropageFormModule", ["schemaDescription"])
  },
  watch: {
    schemaDescription(newValue) {
      this.description = newValue;
    }
  },
  components: {
    FormInputCard
  }
};
</script>
