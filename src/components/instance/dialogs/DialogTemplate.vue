<template v-slot:default>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <slot name="title"></slot>
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
    }
  }
};
</script>
