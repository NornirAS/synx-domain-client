<template>
  <dialog-template>
    <h1 slot="title">{{ dialogTitle }}</h1>
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
  computed: {
    dialogTitle() {
      return this.$store.state.instancesModule.dialogTitle;
    }
  },
  components: {
    DialogTemplate
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
</style>
