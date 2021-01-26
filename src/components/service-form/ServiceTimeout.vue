<template>
  <input-card>
    <div slot="title">Connection Idle-Timeout</div>
    <div slot="subtitle">
      Specifies the length of time that a connection is idle before the
      connection is eligible for deletion.
    </div>
    <v-text-field
      v-model="timeout"
      @blur="addTimeout"
      :rules="timeoutRules"
      name="timeout"
      label="Set timeout"
      type="number"
      error-count="1"
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
      timeoutRules: [v => /^[\d]+$/.test(v) || "Only numbers are allowed"]
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
