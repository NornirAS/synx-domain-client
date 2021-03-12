<template>
  <v-row class="bg" justify="center">
    <v-col cols="12" md="10">
      <v-img
        alt="cioty-logo"
        class="mt-4"
        contain
        src="../assets/cioty-logo-white.webp"
        transition="scale-transition"
        width="60"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <sign-in></sign-in>
    </v-col>
  </v-row>
</template>

<script>
import SignIn from "../components/home/SignIn.vue";
export default {
  created() {
    this.$vuetify.theme.dark = true;
  },
  beforeDestroy() {
    this.$vuetify.theme.dark = false;
  },
  components: {
    SignIn
  }
};
</script>

<style scoped>
.bg {
  background: url("../assets/cioty-background.webp") no-repeat center fixed;
  background-size: cover;
  height: 100%;
}
</style>
