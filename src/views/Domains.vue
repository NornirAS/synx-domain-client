<template>
  <div>
    <h1>Domains</h1>
    <p v-for="(domain, index) in domains" :key="index">{{ domain.name }}</p>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {

  //   }
  // },
  created() {
    this.$socket.emit("get_all_domains", this.token, this.username);
  },
  computed: {
    token() {
      return this.$store.state.idToken;
    },
    username() {
      return this.$store.state.username;
    },
    domains() {
      return this.$store.state.ownedDomains;
    }
  }
};
</script>
