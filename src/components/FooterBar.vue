<template>
  <v-footer :style="footerStyle" padless absolute app>
    <v-card :style="footerCardStyle" align="center" flat tile light>
      <v-card-text>
        <v-img
          max-height="30px"
          max-width="30px"
          src="../assets/SynxDomain_Icon.png"
        >
        </v-img>
        <strong>Powered by Synx</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
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
