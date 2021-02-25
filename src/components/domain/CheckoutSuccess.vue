<template>
  <image-response-template>
    <div slot="title">
      Congratulations! You are now the owner of {{ domain }}.cioty.com
    </div>
    <div slot="action">
      <v-btn
        :to="{ name: 'domains' }"
        color="primary"
        class="text-capitalize align-center"
        rounded
        dark
      >
        Back to your domains
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="connectedWorld"
        contain
        src="../../assets/celebration.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </image-response-template>
</template>

<script>
export default {
  computed: {
    domain() {
      return this.$route.params.domainName;
    }
  },
  components: {
    ImageResponseTemplate: () => import("../ImageResponseTemplate")
  }
};
</script>
