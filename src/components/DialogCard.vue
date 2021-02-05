<template>
  <v-card>
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <slot name="body"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  margin: 0;
  padding: 0 0 8px 0;
}
.v-dialog > .v-card > .v-card__text {
  padding: 8px 24px;
}
</style>
