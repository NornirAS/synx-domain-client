<template>
  <image-response-template>
    <div slot="title">Welcome to Cioty!</div>
    <div slot="description">
      You need a domain to get started.
    </div>
    <div slot="action">
      <v-btn
        :to="{ name: 'create-domain' }"
        class="text-capitalize"
        rounded
        small
        color="info"
      >
        Create your first domain
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="connectedWorld"
        contain
        src="../../assets/connected-world.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </image-response-template>
</template>

<script>
import ImageResponseTemplate from "../ImageResponseTemplate";
export default {
  computed: {
    domainRoute() {
      return this.$route.name === "domains";
    },
    serviceRoute() {
      return this.$route.name === "services";
    },
    ghostRoute() {
      return this.$route.name === "ghosts";
    }
  },
  components: {
    ImageResponseTemplate
  }
};
</script>
