<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>Account</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'services' }"
            :color="colorLightGrey"
            class="text-capitalize"
            rounded
            small
            dark
          >
            <v-icon left>{{ mdiUndoVariant }}</v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col>
          <p>
            <span class="font-weight-black">Email:</span>
            <span class="font-weight-bold font-italic float-right">
              {{ username }}
            </span>
          </p>
          <hr />
          <p>
            <span class="font-weight-black">Token:</span>
            <span class="font-weight-bold font-italic float-right">
              {{ token }}
            </span>
          </p>
          <hr />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            @click="customerPortal"
            :color="colorLightGrey"
            class="text-capitalize"
            rounded
            dark
          >
            <v-icon left>{{ mdiCreditCardOutline }}</v-icon>
            Manage Subscriptions
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mdiUndoVariant, mdiCreditCardOutline } from "@mdi/js";
export default {
  data() {
    return {
      mdiUndoVariant,
      mdiCreditCardOutline,
      colorLightGrey: "#404B5F"
    };
  },
  methods: {
    customerPortal() {
      this.$socket.emit(
        "customer_portal",
        this.domain,
        this.token,
        this.username
      );
    }
  },
  computed: {
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
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
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
p {
  margin: 0;
  color: #58595b;
  font-size: 16px;
}
</style>
