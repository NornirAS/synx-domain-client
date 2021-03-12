<template>
  <home-page-layout>
    <div slot="title">
      Sign In to CIOTY domain service
    </div>
    <div slot="description">
      Not registered yet?
      <a
        href="https://www.synxpass.com/"
        class="text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
        >Sign Up!
      </a>
    </div>
    <div slot="form">
      <sign-in-form></sign-in-form>
    </div>
    <div slot="helper">
      <a
        href="https://www.synxpass.com/reset-password"
        target="_blank"
        rel="noopener noreferrer"
        class="text-decoration-none"
      >
        Forgot you password?
      </a>
    </div>
  </home-page-layout>
</template>

<script>
import HomePageLayout from "./HomePageLayout";
import SignInForm from "./SignInForm";
export default {
  components: {
    HomePageLayout,
    SignInForm
  }
};
</script>
