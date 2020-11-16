<template>
  <dialog-template>
    <div slot="body">
      <v-switch
        v-model="action"
        :color="colorBlue"
        :label="getStatus(this.action)"
        inset
      ></v-switch>
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="refObjectID"
            label="Ref. ObjectID"
            type="number"
            min="1"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="refDomain"
            label="Ref. Domain"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="refService"
            label="Ref. Service"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
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
      refObjectID: "",
      refDomain: "",
      refService: "",
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
      return status === false ? "Remove" : "Add";
    },
    linkableInstance() {
      this.$socket.emit(
        "secondary_service",
        this.domain,
        this.service,
        this.token,
        this.instance,
        this.refObjectID,
        this.refDomain,
        this.refService,
        this.action
      );
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("instancesModule/toggleDialog");
      this.refObjectID = "";
      this.refDomain = "";
      this.refService = "";
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
