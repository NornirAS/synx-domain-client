<template>
  <form-input-card>
    <div slot="title">{{ title }}</div>
    <div slot="subtitle">
      Specify the idle time on active connections. Set time in seconds before
      you want the ghost to disconnect.
    </div>
    <v-text-field
      v-model="serviceTimeout"
      @blur="setTimeout(serviceTimeout)"
      :rules="timeoutRules"
      name="timeout"
      label="Set timeout"
      type="number"
      error-count="1"
      slot="action"
      outlined
      dense
      :min="minTimeout"
      :max="maxTimeout"
    ></v-text-field>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  requiredRule,
  smallerOrEqualRule,
  biggerOrEqualRule
} from "../../../input-rules";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      title: "Connection Idle-Timeout",
      minTimeout: 1,
      maxTimeout: 86400,
      serviceTimeout: "30",
      timeoutRules: [
        v => requiredRule(v, this.title),
        v => smallerOrEqualRule(v, this.title, this.maxTimeout),
        v => biggerOrEqualRule(v, this.title, this.minTimeout)
      ]
    };
  },
  mounted() {
    this.serviceTimeout = this.timeout;
  },
  methods: {
    ...mapMutations("serviceForm", ["setTimeout"])
  },
  computed: {
    ...mapState("serviceForm", ["timeout"])
  },
  components: {
    FormInputCard
  }
};
</script>
