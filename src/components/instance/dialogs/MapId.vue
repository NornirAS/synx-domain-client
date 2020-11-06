<template>
  <dialog-template>
    <v-text-field
      v-model="mapId"
      label="Custom map ID"
      slot="body"
      outlined
      dense
      hide-details
    ></v-text-field>
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
      @click="updateToMapId"
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
      mapId: "",
      actionBtnStyle: {
        backgroundColor: "#27AAE1"
      },
      backBtnStyle: {
        backgroundColor: "#404B5F"
      }
    };
  },
  methods: {
    updateToMapId() {
      this.$socket.emit(
        "update_objectId_to_mapId",
        this.token,
        this.instance,
        this.mapId
      );
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("instancesModule/closeDialog");
      this.mapId = "";
    }
  },
  computed: {
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
