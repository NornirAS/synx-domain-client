<template>
  <form-input-card>
    <div slot="title">Connection Idle-Timeout</div>
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
      required
      outlined
      dense
    ></v-text-field>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../../globals/FormInputCard";
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
