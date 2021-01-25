<template>
  <input-card>
    <div slot="title">Timeout</div>
    <div slot="subtitle">
      Time for inactive channelrequest before it closes(in seconds). Default 30.
    </div>
    <v-text-field
      v-model="timeout"
      @blur="addTimeout"
      :rules="timeoutRules"
      :counter="10"
      name="timeout"
      label="Set timeout"
      type="number"
      error-count="2"
      slot="action"
      required
      outlined
      dense
    ></v-text-field>
  </input-card>
</template>

<script>
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      timeout: "30",
      timeoutRules: [
        v => !!v || "Timeout is required",
        v => (v && v.length) <= 10 || "Timeout must be maximum 15 character",
        v => /^[\d]+$/.test(v) || "Only numbers are allowed"
      ]
    };
  },
  methods: {
    addTimeout() {
      this.$store.commit("serviceFormModule/setTimeout", this.timeout);
    }
  },
  components: {
    InputCard
  }
};
</script>
