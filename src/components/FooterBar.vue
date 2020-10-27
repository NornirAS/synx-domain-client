<template>
  <v-footer :style="footerStyle" absolute :padless="padless" app>
    <v-card :style="footerCardStyle" class="text-center" flat tile light>
      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>Domain service</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
      padless: true,
      localAttrs: "absolute",
      footerCardStyle: {
        width: "100%",
        margin: "0"
      },
      footerStyle: {
        boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)"
      }
    };
  }
};
</script>
