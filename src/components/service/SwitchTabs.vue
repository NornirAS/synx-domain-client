<template>
  <v-tabs fixed-tabs>
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
