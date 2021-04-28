<template>
  <v-card slot="page-content" class="body-1">
    <div class="title mb-5">Account Details</div>
    <v-divider></v-divider>
    <v-row>
      <v-col class="grow">
        <div>Email</div>
      </v-col>
      <v-col class="shrink">
        <div>{{ username }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col class="grow">
        <div>Token</div>
      </v-col>
      <v-col class="shrink">
        <v-btn @click="showToken = !showToken" color="primary" small>
          <v-icon left>{{ showToken ? mdiEyeOff : mdiEye }}</v-icon>
          {{ showToken ? "Hide" : "Show" }}
        </v-btn>
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-row v-if="showToken">
        <v-col class="shrink">
          <copy-content :content="userToken"></copy-content>
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
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { mapState } from "vuex";
import CopyContent from "../globals/CopyContent";
export default {
  data() {
    return {
      mdiEye,
      mdiEyeOff,
      userToken: null,
      showToken: false
    };
  },
  mounted() {
    this.userToken = this.token;
  },
  computed: {
    ...mapState("authentication", ["token", "username"])
  },
  components: {
    CopyContent
  }
};
</script>
