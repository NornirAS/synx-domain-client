<template>
  <v-row justify="start" align="center">
    <v-col class="display-1">
      <slot name="title"></slot>
    </v-col>
    <v-col align="end">
      <slot name="action"></slot>
    </v-col>
  </v-row>
</template>

<style scoped>
.display-1 {
  color: #58595b;
}
</style>
