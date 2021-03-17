<template>
  <v-tabs class="mb-4" fixed-tabs>
    <v-tab @click="isMicropageUpdate ? toServiceUpdate() : false">
      Service
    </v-tab>
    <v-tab @click="isServiceUpdate ? toMicropageUpdate() : false">
      Micropage
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  methods: {
    toServiceUpdate() {
      this.$router.push({ name: "serviceUpdate" });
    },
    toMicropageUpdate() {
      this.$router.push({ name: "micropageUpdate" });
    }
  },
  computed: {
    isServiceUpdate() {
      return this.$route.name === "serviceUpdate";
    },
    isMicropageUpdate() {
      return this.$route.name === "micropageUpdate";
    }
  }
};
</script>

<style scoped>
.v-tabs {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
