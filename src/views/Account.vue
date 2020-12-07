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
            <v-icon small>{{ mdiUndoVariant }}</v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="customerPortal">Check Subscriptions</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mdiUndoVariant } from "@mdi/js";
export default {
  data() {
    return {
      mdiUndoVariant,
      colorLightGrey: "#404B5F"
    };
  },
  methods: {
    customerPortal() {
      this.$socket.emit("customer_portal");
    }
  },
  computed: {
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
</style>
