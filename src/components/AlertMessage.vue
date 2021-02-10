<template>
  <v-alert v-model="open" :type="type" dismissible dense text>
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
  computed: {
    type() {
      return this.alert.success === true ? "success" : "error";
    }
  },
  watch: {
    open(newValue) {
      if (newValue === false) {
        this.$store.commit("alarmModule/removeAlert", this.index);
      }
    }
  }
};
</script>
