<template>
  <home-page-layout>
    <div slot="title">
      Sign In to CIOTY domain service
    </div>
    <div slot="description">
      <!-- Not registered yet?
      <a
        href="https://www.synxpass.com/"
        class="text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
        >Sign Up!
      </a> -->
      Access only for partners. Get in touch at
      <a
        href="https://nornir.io"
        class="text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
      >
        nornir.io
      </a>
    </div>
    <div slot="form">
      <sign-in-form></sign-in-form>
    </div>
    <div slot="helper">
      <a
        :href="`https://${MAIN_DOMAIN}/reset-password`"
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
import { MAIN_DOMAIN } from '@/core/config';
export default {
  methods: {
    MAIN_DOMAIN() {
      return MAIN_DOMAIN
    }
  },
  components: {
    HomePageLayout,
    SignInForm
  }
};
</script>
