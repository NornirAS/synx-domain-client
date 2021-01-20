<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Domains</div>
      <v-btn
        :to="{ name: 'create-domain' }"
        slot="action"
        class="text-capitalize"
        small
        rounded
        outlined
        color="primary"
      >
        New domain
      </v-btn>
    </page-title>
    <div slot="page-content">
      <domains-empty v-if="!domains"></domains-empty>
      <v-card v-for="({ name, active }, index) in domains" :key="index">
        <v-row justify="space-between" align="center">
          <v-col cols="6">
            <p>
              <span class="font-weight-bold">{{ name }}</span>
              .cioty.com
            </p>
          </v-col>
          <v-col cols="6">
            <div align="right">
              <v-btn
                v-if="!active"
                :to="{
                  name: 'domain-activate',
                  params: { domainName: name }
                }"
                color="error"
                class="text-capitalize activate-btn"
                rounded
                x-small
              >
                Activate
              </v-btn>
              <v-chip v-else color="accent" align="center" x-small>
                Active
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </page-layout>
</template>

<script>
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainsEmpty from "../components/empty-page/DomainsEmpty";
import { mdiCircle } from "@mdi/js";
export default {
  data() {
    return {
      mdiCircle
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
  },
  components: {
    PageTitle,
    PageLayout,
    DomainsEmpty
  }
};
</script>

<style scoped>
p {
  margin: 0;
  color: #58595b;
  font-size: 16px;
}
.activate-btn {
  margin: 0;
}
</style>
