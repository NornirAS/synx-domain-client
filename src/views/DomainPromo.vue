<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6">
      <h1 align="center">Hey looks like you have no domains.</h1>
      <h1 align="center">Buy one to start develop.</h1>
      <h1 align="center">There is 30 days FREE TRIAL!!</h1>
      <div class="text-center">
        <v-btn :to="{ name: 'domain-purchase' }" rounded dark
          >Buy a Domain</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>
