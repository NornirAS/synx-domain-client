<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">My Account</div>
    </page-title>
    <v-card slot="page-content" class="body-1">
      <v-row>
        <v-col cols="2">
          <div class="font-weight-bold">Email</div>
        </v-col>
        <v-col cols="10" align="end">
          <div>{{ username }}</div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="2">
          <div class="font-weight-bold">Token</div>
        </v-col>
        <v-col cols="10" align="end">
          <v-btn
            @click="showToken = !showToken"
            class="text-capitalize"
            color="primary"
            rounded
            small
          >
            <v-icon left>{{ showToken ? mdiEyeOff : mdiEye }}</v-icon>
            {{ showToken ? "Hide" : "Show" }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showToken">
        <v-col cols="12" align="end">
          <div>{{ token }}</div>
        </v-col>
      </v-row>
    </v-card>
  </page-layout>
</template>

<script>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { mapState } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
export default {
  data() {
    return {
      mdiEye,
      mdiEyeOff,
      showToken: false
    };
  },
  computed: {
    ...mapState("authentication", ["token", "username"])
  },
  components: {
    PageTitle,
    PageLayout
  }
};
</script>
