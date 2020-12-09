<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>My Domains</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :color="colorBlue"
            :to="{ name: 'create-domain' }"
            class="text-capitalize"
            small
            rounded
            dark
          >
            Create domain
          </v-btn>
        </v-col>
      </v-row>
      <hr />
      <v-card
        v-for="({ name, active }, index) in domains"
        :key="index"
        :to="{ name: 'services', params: { domainName: name } }"
      >
        <v-row justify="space-between" align="center">
          <v-col cols="6">
            <h3>
              {{ name }}
              <v-chip
                v-if="active === true"
                :color="colorGreen"
                align="center"
                x-small
                label
                dark
              >
                Active
              </v-chip>
              <v-chip
                v-if="active === false"
                :color="colorRed"
                align="center"
                x-small
                label
                dark
              >
                Inactive
              </v-chip>
            </h3>
          </v-col>
          <v-col cols="6">
            <div align="right">
              <v-btn
                v-if="active === true"
                :to="{ name: 'domain-activate', params: { domainName: name } }"
                :color="colorLightGrey"
                class="text-capitalize"
                rounded
                x-small
                dark
              >
                Activate
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCircle } from "@mdi/js";
export default {
  data() {
    return {
      mdiCircle,
      colorGreen: "#71b663",
      colorRed: "#ff6666",
      colorLightGrey: "#404B5F",
      colorBlue: "#27AAE1"
    };
  },
  created() {
    this.$socket.emit("get_all_domains", this.token, this.username);
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    domains() {
      return this.$store.state.domainsModule.ownedDomains;
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
h3 {
  color: #58595b;
  font-size: 16px;
  font-weight: 500;
}
p {
  margin: 0;
  color: #58595b;
  font-size: 16px;
}
</style>
