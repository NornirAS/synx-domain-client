<template>
  <v-card>
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="subtitle"></slot>
    </v-card-subtitle>
    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
    <v-card-actions>
      <slot name="table"></slot>
    </v-card-actions>
  </v-card>
</template>
