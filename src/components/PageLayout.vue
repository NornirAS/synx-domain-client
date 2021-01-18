<template>
  <v-row justify="space-between" class="page-layout-style">
    <v-col cols="12" md="7" offset-md="1">
      <slot name="page-content"></slot>
    </v-col>
  </v-row>
</template>

<style scoped>
@media screen and (min-width: 960px) {
  .page-layout-style {
    margin-top: 3em;
  }
}
</style>
