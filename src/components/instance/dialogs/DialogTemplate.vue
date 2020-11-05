<template v-slot:default>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <h1 slot="title">{{ dialogTitle }}</h1>
      </v-card-title>
      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>
      <v-card-actions :style="cardActionStyle">
        <slot name="cancel"></slot>
        <v-spacer></v-spacer>
        <slot name="action"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      cardActionStyle: {
        padding: "0 24px 20px"
      }
    };
  },
  computed: {
    dialog() {
      return this.$store.state.instancesModule.dialog;
    },
    dialogTitle() {
      return this.$store.state.instancesModule.dialogTitle;
    }
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
