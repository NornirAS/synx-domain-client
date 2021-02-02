<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">
        {{ ghost.service.toLowerCase() }}#{{ ghost.instance }}
      </div>
    </page-title>
    <div slot="page-content">
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
