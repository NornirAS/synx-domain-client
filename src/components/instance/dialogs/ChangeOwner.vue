<template>
  <dialog-template>
    <v-text-field
      label="New Owner Username"
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
    <v-btn :style="actionBtnStyle" slot="action" rounded dark>
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
    closeDialog() {
      this.$store.commit("instancesModule/toggleDialog");
    }
  },
  components: {
    DialogTemplate
  }
};
</script>
