<template>
  <input-card>
    <div slot="title">Command Schema</div>
    <div slot="subtitle">
      This is the message format or API for this service command XML. Put XML on
      a single line to make it easier to parse on the client.
    </div>
    <v-combobox
      v-model="command"
      :rules="commandRules"
      :counter="30"
      name="commands"
      label="Commands"
      type="text"
      error-count="2"
      slot="action"
      multiple
      chips
    >
      <template v-slot:selection="data">
        <v-chip
          :key="data.index"
          v-bind="data.attrs"
          @click:close="remove(data.index)"
          close
        >
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>
  </input-card>
</template>

<script>
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      command: "",
      commandRules: [
        v => (v && v.length) >= 1 || "Command is required",
        v => (v && v.length) <= 30 || "You can add maximum 30 keywords"
      ]
    };
  },
  mounted() {
    if (this.isEditPage) {
      this.command = this.commandSchema.map(obj => obj.tagName);
    }
  },
  methods: {
    remove(index) {
      this.command.splice(index, 1);
    }
  },
  computed: {
    commandSchema() {
      return this.$store.state.serviceFormModule.commandSchema;
    },
    isEditPage() {
      return this.$route.params.index >= 0;
    }
  },
  watch: {
    command() {
      this.$store.commit("serviceFormModule/addCommand", this.command);
    }
  },
  components: {
    InputCard
  }
};
</script>
