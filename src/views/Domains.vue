<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>My Domains</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :color="colorGreen"
            :to="{ name: 'domain-purchase' }"
            rounded
            dark
          >
            Add a domain
          </v-btn>
        </v-col>
      </v-row>
      <hr />
      <v-card
        v-for="({ name, active }, index) in domains"
        :key="index"
        :to="{ name: 'services', params: { name: name } }"
      >
        <v-row>
          <v-col cols="12" sm="6">
            {{ name }}
          </v-col>
          <v-col cols="12" sm="6">
            <div align="right">
              <span>Status </span>
              <v-icon v-if="active === true" :color="colorGreen" x-small>
                {{ mdiCircle }}
              </v-icon>
              <v-icon v-else :color="colorRed" x-small>{{ mdiCircle }}</v-icon>
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
      colorRed: "#ff6666"
    };
  },
  created() {
    this.$socket.emit("get_all_domains", this.token, this.username);
  },
  computed: {
    token() {
      return this.$store.state.idToken;
    },
    username() {
      return this.$store.state.username;
    },
    domains() {
      return this.$store.state.ownedDomains;
    }
  }
};
</script>
