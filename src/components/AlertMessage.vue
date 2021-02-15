<template>
  <v-alert v-model="open" :type="type" dense text>
    {{ alert.message }}
  </v-alert>
</template>

<script>
export default {
  props: ["alert", "index"],
  data() {
    return {
      open: true
    };
  },
  created() {
    this.$store.dispatch("alarmModule/removeAlert");
  },
  computed: {
    type() {
      return this.alert.success === true ? "success" : "error";
    }
  }
};
</script>
