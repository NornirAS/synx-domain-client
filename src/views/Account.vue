<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">My Account</div>
      <v-btn
        @click="customerPortal"
        slot="action"
        class="text-capitalize"
        outlined
        rounded
        small
        color="primary"
      >
        Manage Subscriptions
      </v-btn>
    </page-title>
    <v-card slot="page-content">
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
  </page-layout>
</template>

<script>
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
export default {
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
    PageTitle,
    PageLayout
  }
};
</script>
