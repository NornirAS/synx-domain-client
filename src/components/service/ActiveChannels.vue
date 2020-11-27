<template>
  <v-btn
    @click="showActiveChannels"
    :style="btnStyle"
    :outlined="outlined"
    :text="text"
    :disabled="disabled"
    rounded
    x-small
    ligth
  >
    {{ btnTitle }}
  </v-btn>
</template>

<script>
export default {
  props: ["serviceName", "index", "btnStyle"],
  data() {
    return {
      btnTitle: "Show active channels",
      outlined: true,
      text: false,
      disabled: false
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
      return this.serviceName;
    },
    activeChannels() {
      return this.$store.state.servicesModule.services[this.index]
        .activeChannels;
    }
  },
  watch: {
    activeChannels(newValue) {
      if (newValue !== "") {
        this.btnTitle = `Active Channels: ${newValue}`;
        this.outlined = false;
        this.text = true;
        this.disabled = true;
      }
    }
  }
};
</script>

<style>
.theme--light.v-btn.v-btn--disabled {
  color: #58595b !important;
}
</style>
