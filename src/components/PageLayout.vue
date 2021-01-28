<template>
  <v-row justify="space-between" class="page-layout-style">
    <v-col cols="12" md="8" lg="6" xl="4" offset-md="1">
      <slot name="page-title"></slot>
      <v-divider></v-divider>
      <slot name="page-search"></slot>
      <v-divider></v-divider>
      <div class="margin-top">
        <slot name="page-content"></slot>
      </div>
      <div class="margin-top">
        <slot name="pagination"></slot>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.margin-top {
  margin-top: 1em;
}
.display-1 {
  color: var(--v-secondary-base);
}
@media screen and (min-width: 960px) {
  .page-layout-style {
    margin-top: 3em;
  }
}
</style>
