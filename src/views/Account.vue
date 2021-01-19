<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">My Account</div>
      <v-btn
        @click="customerPortal"
        slot="action"
        class="text-capitalize"
        rounded
        small
        dark
      >
        Manage Subscriptions
      </v-btn>
    </page-title>
    <v-row slot="page-content">
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

<style scoped>
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text) {
  background-color: #27aae1;
}
</style>
