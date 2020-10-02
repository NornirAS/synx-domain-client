<template>
  <div>
    <h1>Welcome to CIOTY domain service</h1>
    <v-btn :to="path" link></v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: { name: "signin" }
    };
  }
};
</script>
