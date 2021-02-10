<template>
  <v-alert :color="color" :type="type" dismissible dense text>
    {{ alert.message }}
  </v-alert>
</template>

<script>
export default {
  props: ["alert", "index"],
  computed: {
    color() {
      return this.alert.success === true ? "accent" : "error";
    },
    type() {
      return this.alert.success === true ? "success" : "error";
    }
  }
};
</script>
