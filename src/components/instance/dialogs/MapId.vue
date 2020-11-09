<template>
  <dialog-template>
    <div slot="body">
      <v-switch
        v-model="generate"
        :color="colorBlue"
        :label="`Generate mapID: ${generate.toString()}`"
        inset
      ></v-switch>
      <v-text-field
        v-if="!generate"
        v-model="mapId"
        label="Custom map ID"
        outlined
        dense
        hide-details
      ></v-text-field>
    </div>
    <v-btn @click="closeDialog" :color="colorGrey" slot="cancel" rounded dark>
      Cancel
    </v-btn>
    <v-btn @click="updateToMapId" :color="colorBlue" slot="action" rounded dark>
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
      generate: true,
      colorBlue: "#27AAE1",
      colorGrey: "#404B5F"
    };
  },
  methods: {
    updateToMapId() {
      this.$socket.emit(
        "update_objectId_to_mapId",
        this.token,
        this.domain,
        this.service,
        this.instance,
        this.mapId,
        this.generate
      );
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("instancesModule/toggleDialog");
      this.mapId = "";
      this.generate = true;
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
