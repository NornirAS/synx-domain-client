<template>
  <div>
    <h1>Welcome to CIOTY domain service</h1>
    <LoginForm />
    <p>{{ getToken }}</p>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
export default {
  components: {
    LoginForm
  },
  computed: {
    getToken() {
      return this.$store.state.token;
    }
  }
};
</script>
