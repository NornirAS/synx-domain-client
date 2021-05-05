<template>
  <form-input-card>
    <div slot="title">Command Description</div>
    <div slot="subtitle">
      Describe your command and which option the secondary service provider with
      an active link can perform on your service.
    </div>
    <v-textarea
      v-model="description"
      @blur="addCommandDescription(description)"
      :rules="descriptionRules"
      :counter="512"
      name="description"
      label="Describe your public commands"
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
    ...mapMutations("micropageForm", ["addCommandDescription"])
  },
  computed: {
    ...mapState("micropageForm", ["commandOverview"])
  },
  watch: {
    commandOverview(newValue) {
      this.description = newValue.description;
    }
  },
  components: {
    FormInputCard
  }
};
</script>
