<template>
  <form-input-card>
    <div slot="title">Connection Idle-Timeout</div>
    <div slot="subtitle">
      Specifies the length of time that a connection is idle before the
      connection is eligible for deletion.
    </div>
    <v-text-field
      v-model="serviceTimeout"
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
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceTimeout: "30",
      timeoutRules: [v => /^[\d]+$/.test(v) || "Only numbers are allowed"]
    };
  },
  mounted() {
    this.serviceTimeout = this.timeout;
  },
  methods: {
    ...mapMutations("serviceFormModule", ["setTimeout"]),
    addTimeout() {
      this.setTimeout(this.serviceTimeout);
    }
  },
  computed: {
    ...mapState("serviceFormModule", ["timeout"])
  },
  components: {
    FormInputCard
  }
};
</script>
