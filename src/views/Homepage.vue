<template>
  <div>
    <h1>Welcome to CIOTY domain service</h1>
    <v-btn :to="path" :color="colorBlue" link rounded dark>Sign In</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: { name: "signin" },
      colorBlue: "#27AAE1"
    };
  }
};
</script>
