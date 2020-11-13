<template>
  <dialog-template>
    <div slot="body">
      <v-switch
        v-model="action"
        :color="colorBlue"
        :label="getStatus(this.action)"
        inset
      ></v-switch>
      <v-text-field
        v-model="username"
        label="Username"
        outlined
        dense
        hide-details
      ></v-text-field>
    </div>
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
      @click="readAccess"
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
      username: "",
      action: true,
      actionBtnStyle: {
        backgroundColor: "#27AAE1"
      },
      backBtnStyle: {
        backgroundColor: "#404B5F"
      },
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    getStatus(status) {
      return status === false ? "Remove" : "Give";
    },
    readAccess() {
      this.$socket.emit(
        "read_access",
        this.domain,
        this.service,
        this.token,
        this.username,
        this.instance,
        this.action
      );
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("instancesModule/toggleDialog");
      this.username = "";
      this.action = true;
    }
  },
  computed: {
    domain() {
      return this.$store.state.instancesModule.selectedDomain;
    },
    service() {
      return this.$store.state.instancesModule.selectedService;
    },
    token() {
      return this.$store.state.authModule.idToken;
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
