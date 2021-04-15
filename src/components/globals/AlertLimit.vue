<template>
  <v-alert class="mt-4" border="left" text dense type="warning">
    <div v-if="isDomainsPage" class="body-1">
      You have reached the domain limit on cioty.com makerspace. Cioty only
      allows 2 domains per user. If you want unlimited access to domains or
      creating your own private Hive network, please contact one of our sales
      representatives at
      <a
        href="https://nornir.io/our-team/"
        target="_blank"
        rel="noopener noreferrer"
        >Nornir</a
      >
    </div>
    <div v-if="isServicesPage" class="body-1">
      You have reached the service limit on cioty.com makerspace. Cioty only
      allows 5 services per user. If you want unlimited access to services or
      creating your own private Hive network, please contact one of our sales
      representatives at
      <a
        href="https://nornir.io/our-team/"
        target="_blank"
        rel="noopener noreferrer"
        >Nornir</a
      >
    </div>
    <div v-if="isGhostsPage" class="body-1">
      You have reached the ghost limit on cioty.com makerspace. Cioty only
      allows 10 ghosts per user. If you want unlimited access to ghosts or
      creating your own private Hive network, please contact one of our sales
      representatives at
      <a
        href="https://nornir.io/our-team/"
        target="_blank"
        rel="noopener noreferrer"
        >Nornir</a
      >
    </div>
  </v-alert>
</template>

<script>
export default {
  computed: {
    isDomainsPage() {
      return this.$route.name === "domains";
    },
    isServicesPage() {
      return this.$route.name === "services";
    },
    isGhostsPage() {
      return this.$route.name === "ghosts";
    }
  }
};
</script>
