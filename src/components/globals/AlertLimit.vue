<template>
  <v-alert class="mt-4" border="left" text dense type="warning">
    <div v-if="isDomainsPage" class="body-1">
      Dear user, you have reached the limit of domains you can have on CIoTY
      makerspace. Please contact
      <a href="mailto:support@nornir.io">support@nornir.io</a> or purchase a
      full version of Synx Hive to create your own
      <a href="https://nornir.io" target="_blank" rel="noopener noreferrer"
        >machine collective</a
      >.
    </div>
    <div v-if="isServicesPage" class="body-1">
      Dear user, you have reached the limit of services you can have on CIoTY
      makerspace. Please contact
      <a href="mailto:support@nornir.io">support@nornir.io</a> or purchase a
      full version of Synx Hive to create your own
      <a href="https://nornir.io" target="_blank" rel="noopener noreferrer"
        >machine collective</a
      >.
    </div>
    <div v-if="isGhostsPage" class="body-1">
      Dear user, you have reached the limit of ghosts you can have on CIoTY
      makerspace. Please contact
      <a href="mailto:support@nornir.io">support@nornir.io</a> or purchase a
      full version of Synx Hive to create your own
      <a href="https://nornir.io" target="_blank" rel="noopener noreferrer"
        >machine collective</a
      >.
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
