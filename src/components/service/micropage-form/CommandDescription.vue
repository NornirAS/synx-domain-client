<template>
  <form-input-card>
    <div slot="title">Command Description</div>
    <div slot="subtitle">
      Use this space to tell the secondary service provider about your commands
      and parameters that you support. Only secondary service providers that are
      linking to your service schema are allowed to send you commands. When you
      have an active command service you need to develop a software agent to
      handle incoming commands. Command schema is not linkable. If you like help
      to create a software agent to handle incoming commands, please visit
      nornir.academy and post for help. There will be a lot of examples
      available in different programming languages to get you started.
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
    ...mapState("micropageForm", ["commandDescription"])
  },
  watch: {
    commandDescription(newValue) {
      this.description = newValue;
    }
  },
  components: {
    FormInputCard
  }
};
</script>
