<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">My Account</div>
    </page-title>
    <v-card slot="page-content" class="body-1">
      <v-row>
        <v-col class="grow">
          <div class="font-weight-bold">Email</div>
        </v-col>
        <v-col class="shrink">
          <div>{{ username }}</div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col class="grow">
          <div class="font-weight-bold">Token</div>
        </v-col>
        <v-col class="shrink">
          <v-btn @click="showToken = !showToken" color="primary" small>
            <v-icon left>{{ showToken ? mdiEyeOff : mdiEye }}</v-icon>
            {{ showToken ? "Hide" : "Show" }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showToken">
        <v-col class="shrink">
          <copy-content
            :content="userToken"
            color="primary"
            left
          ></copy-content>
        </v-col>
        <v-col class="grow">
          <v-text-field
            v-model="userToken"
            dense
            outlined
            hide-details
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </page-layout>
</template>

<script>
import { mdiEye, mdiEyeOff, mdiContentCopy, mdiCheck } from "@mdi/js";
import { mapState } from "vuex";
import PageTitle from "../components/globals/PageTitle";
import PageLayout from "../components/globals/PageLayout";
import CopyContent from "../components/globals/CopyContent";
export default {
  data() {
    return {
      mdiEye,
      mdiEyeOff,
      mdiContentCopy,
      mdiCheck,
      userToken: null,
      showToken: false,
      show: false
    };
  },
  mounted() {
    this.userToken = this.token;
  },
  methods: {
    copyToClipboard(s) {
      navigator.clipboard.writeText(s);
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  },
  computed: {
    ...mapState("authentication", ["token", "username"])
  },
  components: {
    PageTitle,
    PageLayout,
    CopyContent
  }
};
</script>
