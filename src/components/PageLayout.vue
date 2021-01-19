<template>
  <v-row justify="space-between" class="page-layout-style">
    <v-col cols="12" md="5" offset-md="1">
      <slot name="page-title"></slot>
      <v-divider></v-divider>
      <slot name="page-search"></slot>
      <v-divider></v-divider>
      <slot name="page-content"></slot>
    </v-col>
  </v-row>
</template>

<style scoped>
.display-1 {
  color: var(--v-secondary-base);
}
@media screen and (min-width: 960px) {
  .page-layout-style {
    margin-top: 3em;
  }
}
</style>
