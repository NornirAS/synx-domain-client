<template>
  <dialog-template>
    <v-btn
      @click="closeDialog"
      :style="backBtnStyle"
      slot="cancel"
      rounded
      dark
    >
      Cancel
    </v-btn>
    <v-btn
      @click="killSession"
      :style="actionBtnStyle"
      slot="action"
      rounded
      dark
    >
      Confirm
    </v-btn>
  </dialog-template>
</template>

<script>
import DialogTemplate from "./DialogTemplate";
export default {
  data() {
    return {
      actionBtnStyle: {
        backgroundColor: "#27AAE1"
      },
      backBtnStyle: {
        backgroundColor: "#404B5F"
      }
    };
  },
  methods: {
    killSession() {
      this.$socket.emit(
        "kill_session",
        this.domain,
        this.service,
        this.token,
        this.instance
      );
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("instancesModule/toggleDialog");
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    domain() {
      return this.$store.state.instancesModule.selectedDomain;
    },
    service() {
      return this.$store.state.instancesModule.selectedService;
    },
    instance() {
      return this.$store.state.instancesModule.selectedInstance;
    }
  },
  components: {
    DialogTemplate
  }
};
</script>
