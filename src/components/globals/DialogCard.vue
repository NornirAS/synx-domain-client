<template>
  <v-card class="ma-0 pa-0">
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-2 px-6">
      <slot name="body"></slot>
    </v-card-text>
    <v-card-actions class="pb-4 px-6">
      <slot name="cancel-btn"></slot>
      <v-spacer></v-spacer>
      <slot name="confirm-btn"></slot>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-dialog > .v-card > .v-card__title {
  color: #ffffff;
  background-color: var(--v-secondary-base) !important;
}
</style>
