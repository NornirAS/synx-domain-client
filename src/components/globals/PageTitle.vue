<template>
  <v-row align="center">
    <v-col class="grow">
      <div class="display-1">
        <slot name="title"></slot>
      </div>
      <div class="title">
        <slot name="subtitle"></slot>
      </div>
    </v-col>
    <v-col class="shrink">
      <slot name="action"></slot>
    </v-col>
  </v-row>
</template>
