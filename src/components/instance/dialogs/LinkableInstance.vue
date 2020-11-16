<template>
  <dialog-template>
    <div slot="body">
      <v-switch
        v-model="status"
        :color="colorBlue"
        :label="getStatus(this.status)"
        inset
      ></v-switch>
      <v-text-field
        v-model="linkTo"
        label="Link to domain/service"
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
      @click="linkableInstance"
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
      linkTo: "",
      status: false,
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
      return status === false ? "Deny" : "Allow";
    },
    linkableInstance() {
      this.$socket.emit(
        "linkable_instance",
        this.domain,
        this.service,
        this.token,
        this.instance,
        this.linkTo,
        this.status
      );
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("instancesModule/toggleDialog");
      this.linkTo = "";
      this.status = false;
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
