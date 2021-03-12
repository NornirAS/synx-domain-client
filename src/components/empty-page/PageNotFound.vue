<template>
  <div>
    <div align="center">
      <v-img
        alt="cioty"
        src="../../assets/CIOTY-final-Logo.webp"
        transition="scale-transition"
        class="image-center"
      />
    </div>
    <image-response-template>
      <div slot="title">404</div>
      <div slot="description">
        This page has run away!
      </div>
      <div slot="action">
        <v-btn
          @click="toDomains"
          class="text-capitalize"
          rounded
          small
          color="info"
        >
          Go to domains
        </v-btn>
      </div>
      <div slot="image">
        <v-img
          alt="runningWild"
          contain
          src="../../assets/running-wild.webp"
          transition="scale-transition"
          height="300px"
        >
        </v-img>
      </div>
    </image-response-template>
  </div>
</template>

<script>
import ImageResponseTemplate from "../ImageResponseTemplate";
export default {
  methods: {
    toDomains() {
      this.$router.push({ name: "domains" });
    }
  },
  components: {
    ImageResponseTemplate
  }
};
</script>

<style>
.image-center {
  margin: 4em 0;
  width: 100px;
}
</style>
