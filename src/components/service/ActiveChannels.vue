<template>
  <v-btn
    @click="showActiveChannels"
    :color="colorLightGrey"
    :text="text"
    :disabled="disabled"
    :dark="dark"
    class="text-capitalize"
    rounded
    x-small
  >
    {{ btnTitle }}
  </v-btn>
</template>

<script>
export default {
  props: ["domain", "service", "index"],
  data() {
    return {
      btnTitle: "Show active channels",
      text: false,
      disabled: false,
      dark: true,
      colorLightGrey: "#404B5F"
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
    token() {
      return this.$store.state.authModule.idToken;
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
        this.dark = false;
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
.v-btn {
  margin: 0.3em 1em 0.3em 0;
}
</style>
