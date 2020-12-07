<template>
  <v-row justify="center" align="center" class="full-height">
    <v-col cols="12" md="6">
      <h1 align="center">
        Ooooups! Something went wrong. Try again!
      </h1>
      <v-row justify="center">
        <v-btn
          :to="{ name: 'domains' }"
          :color="colorBlue"
          class="text-capitalize"
          rounded
          dark
        >
          Back to your domains
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      colorBlue: "#27AAE1"
    };
  }
};
</script>

<style>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
.full-height {
  height: 100%;
}
</style>