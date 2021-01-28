<template>
  <v-card class="subscription-card">
    <v-list class="subscription-card">
      <v-list-item>
        <v-list-item-title class="title">
          <slot name="title"></slot>
        </v-list-item-title>
        <v-list-item-subtitle class="text-right">
          <slot name="radio-button"></slot>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-text>
      <slot name="description"></slot>
    </v-card-text>
    <v-divider></v-divider>
    <v-list class="subscription-card">
      <v-list-item>
        <v-list-item-title>
          <slot name="monthlyCost"></slot>
        </v-list-item-title>
        <v-list-item-subtitle class="text-right">
          <slot name="discount"></slot>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.subscription-card {
  background-color: var(--v-background-base);
}
</style>
