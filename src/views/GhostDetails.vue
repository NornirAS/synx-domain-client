<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ ghost.service.toLowerCase() }}#{{ ghost.instance }}
      </div>
    </page-title>
    <div slot="page-content">
      <v-card>
        <v-list>
          <div class="title mb-5">Details</div>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>URI</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
              {{ ghostURI }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title
              >Make data available for external linking?</v-list-item-title
            >
            <v-list-item-subtitle class="text-right font-weight-bold">
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Read access to data</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Map ID</v-list-item-title>
            <v-list-item-subtitle class="text-right font-weight-bold">
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-card>
    </div>
  </page-layout>
</template>

<script>
// import { mdiCheck, mdiClose } from "@mdi/js";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
export default {
  data() {
    return {};
  },
  created() {
    this.$socket.emit("look_for_new_instances", this.token, this.username);
  },
  methods: {
    confirm(item) {
      this.$socket.emit(
        "confirm_instance",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    },
    deny(item) {
      this.$socket.emit(
        "deny_instance",
        item.domain,
        item.service,
        this.token,
        this.username,
        item.instance
      );
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    ghost() {
      return this.$store.state.instancesModule.selectedGhost;
    },
    domain() {
      return this.ghost.domain.toLowerCase();
    },
    service() {
      return this.ghost.service.toLowerCase();
    },
    instance() {
      return this.ghost.instance;
    },
    ghostURI() {
      return `${this.domain}.cioty.com/${this.service}#${this.instance}`;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("look_for_new_instances", this.token, this.username);
    }
  },
  components: {
    PageLayout,
    PageTitle
  }
};
</script>
