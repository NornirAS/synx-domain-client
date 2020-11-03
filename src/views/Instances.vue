<template>
  <div>
    <h1>
      Instances
    </h1>
    <v-btn @click="getInstances">Get Instances</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    getInstances() {
      this.$socket.emit("get_all_instances", this.token);
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    }
  }
};
</script>