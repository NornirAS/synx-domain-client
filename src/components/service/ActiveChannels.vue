<template>
  <v-btn
    @click="showActiveChannels"
    :style="btnStyle"
    outlined
    rounded
    x-small
    ligth
  >
    Show active channels
  </v-btn>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      btnStyle: {
        color: "#58595B"
      }
    };
  },
  methods: {
    showActiveChannels() {
      this.$socket.emit(
        "show-active-channels",
        this.domain,
        this.service,
        this.token
      );
    }
  },
  computed: {
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    service() {
      return this.title;
    },
    token() {
      return this.$store.state.authModule.idToken;
    }
  }
};
</script>
