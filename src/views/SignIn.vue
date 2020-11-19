<template>
  <v-row class="bg" style="height: 100%" justify="center">
    <v-col cols="12" align="center">
      <v-img
        alt="Cioty"
        class="shrink mr-2"
        contain
        src="../assets/CIOTY-final-Logo.png"
        transition="scale-transition"
        width="50"
      />
    </v-col>
    <v-col cols="12">
      <h1 justify="center" align="center">Welcome to CIOTY domain service</h1>
      <br />
      <p justify="center" align="center">
        Sign In with your Synx ID and password. Not registered yet?
        <a href="#" class="text-decoration-none synxpass-link">Sign Up!</a>
      </p>
      <SignInForm />
    </v-col>
  </v-row>
</template>

<script>
import SignInForm from "../components/SignInForm.vue";
export default {
  components: {
    SignInForm
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-family: sans-serif;
  font-weight: 400;
  color: #ffffff;
}
p {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 300;
  color: #ffffff;
}
.bg {
  background: url("../assets/cioty-background.png") no-repeat center fixed;
  background-size: cover;
}
.synxpass-link {
  color: #00afab;
}
</style>