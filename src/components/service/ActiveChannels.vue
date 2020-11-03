<template>
  <div>
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
    <v-badge>{{ activeChannels }}</v-badge>
  </div>
</template>

<script>
export default {
  props: ["title", "index"],
  data() {
    return {
      test: null,
      btnStyle: {
        color: "#58595B"
      }
    };
  },
  methods: {
    showActiveChannels() {
      this.$socket.emit(
        "show_active_channels",
        this.domain,
        this.service,
        this.token,
        this.index
      );
    }
  },
  computed: {
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    service() {
      return this.title;
    },
    activeChannels() {
      return this.$store.state.servicesModule.services[this.index]
        .activeChannels;
    }
  }
};
</script>
