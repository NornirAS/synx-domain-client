<template>
  <v-card class="subscription-card">
    <v-card-title class="title">
      <slot name="title"></slot>
      <v-spacer></v-spacer>
      <slot name="radio-button"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="trial"></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name="description"></slot>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-title class="title">
      <slot name="monthlyCost"></slot>
      <v-spacer></v-spacer>
      <slot name="discount"></slot>
    </v-card-title>
  </v-card>
</template>

<style scoped>
.subscription-card {
  background-color: #fbfcfd;
}
</style>
