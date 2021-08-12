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
      <div slot="title">We are down for sheduled maintenance!</div>
      <div slot="description">
        Will be back soon!
      </div>
      <div slot="image">
        <v-img
          alt="runningWild"
          contain
          src="../../assets/warning.webp"
          transition="scale-transition"
          height="300px"
        >
        </v-img>
      </div>
    </image-response-template>
  </div>
</template>

<script>
import ImageResponseTemplate from "../globals/ImageResponseTemplate";
export default {
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
