<template>
  <v-row justify="start" align="center">
    <v-col lg="9">
      <div class="display-1">
        <slot name="title"></slot>
      </div>
      <div class="title">
        <slot name="subtitle"></slot>
      </div>
    </v-col>
    <v-col lg="3" align="end">
      <slot name="action"></slot>
    </v-col>
  </v-row>
</template>

<style scoped>
/* .display-1 {
  color: var(--v-secondary-base);
} */
</style>
