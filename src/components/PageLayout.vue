<template>
  <v-row justify="start" class="mt-md-10 mx-md-10">
    <v-col cols="12" md="10" lg="8" xl="5">
      <slot name="page-title"></slot>
      <v-divider></v-divider>
      <slot name="page-search"></slot>
      <v-divider></v-divider>
      <div class="mt-4">
        <slot name="page-content"></slot>
      </div>
    </v-col>
    <v-col md="2" class="mt-md-16 pt-md-8">
      <slot name="page-content-right"></slot>
    </v-col>
  </v-row>
</template>
