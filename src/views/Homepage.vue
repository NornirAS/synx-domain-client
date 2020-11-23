<template>
  <v-row class="bg" justify="center">
    <v-col cols="12" md="10" :align="isMobile">
      <br />
      <v-img
        alt="Cioty"
        class="shrink mr-2"
        contain
        src="../assets/cioty-logo-white.png"
        transition="scale-transition"
        width="60"
      />
    </v-col>
    <v-col cols="12">
      <h1 align="center">Welcome to CIOTY domain service</h1>
      <br />
      <p align="center">
        Sign In with your Synx ID and password. Not registered yet?
        <a
          href="https://synxpass.com/"
          class="text-decoration-none synxpass-link"
          target="_blank"
          >Sign Up!
        </a>
      </p>
      <SignInForm />
    </v-col>
  </v-row>
</template>

<script>
import SignInForm from "../components/SignInForm.vue";
export default {
  computed: {
    isMobile() {
      return this.$store.state.isMobile ? "center" : "left";
    }
  },
  components: {
    SignInForm
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: 300;
  color: #ffffff;
}
p {
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
}
.bg {
  background: url("../assets/cioty-background.png") no-repeat center fixed;
  background-size: cover;
  height: 100%;
}
.synxpass-link {
  color: #00afab;
}
</style>
