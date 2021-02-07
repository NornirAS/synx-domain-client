<template>
  <v-alert :color="color" type="success" dismissible dense text>
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  props: ["message"],
  computed: {
    isSuccess() {
      return this.message.includes("Success");
    },
    color() {
      return this.isSuccess === true ? "accent" : "error";
    }
  }
};
</script>
