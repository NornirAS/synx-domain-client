<template>
  <input-card>
    <div slot="title">Title*</div>
    <div slot="subtitle">Keep it short and sweet!</div>
    <v-text-field
      v-model="name"
      name="name"
      label="Title for micropage"
      type="text"
      slot="action"
      :disabled="disabled"
      required
      outlined
      dense
    ></v-text-field>
  </input-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      disabled: true
    };
  },
  mounted() {
    this.name = this.serviceName;
  },
  computed: {
    serviceName() {
      return this.$store.state.serviceFormModule.name;
    }
  },
  watch: {
    serviceName(newValue) {
      this.name = newValue;
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
