<template>
  <page-layout>
    <div slot="page-content">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>My Account</h1>
        </v-col>
        <v-col align="end">
          <v-btn
            @click="customerPortal"
            :color="colorLightGrey"
            class="text-capitalize"
            rounded
            small
            dark
          >
            <v-icon left>{{ mdiCreditCardOutline }}</v-icon>
            Manage Subscriptions
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <div class="font-weight-bold">Email</div>
                </v-col>
                <v-col cols="8" align="end">
                  <div>{{ username }}</div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="4">
                  <div class="font-weight-bold">Token</div>
                </v-col>
                <v-col cols="8" align="end">
                  <div>{{ token }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </page-layout>
</template>

<script>
import { mdiCreditCardOutline } from "@mdi/js";
import PageLayout from "../components/PageLayout";
export default {
  data() {
    return {
      mdiCreditCardOutline,
      colorLightGrey: "#404B5F"
    };
  },
  methods: {
    customerPortal() {
      this.$socket.emit("customer_portal", this.token, this.username);
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    customerPortalUrl() {
      return this.$store.state.stripeModule.customerPortalUrl;
    }
  },
  watch: {
    customerPortalUrl(newValue) {
      window.location.href = newValue;
    }
  },
  components: {
    PageLayout
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 600;
}
</style>
