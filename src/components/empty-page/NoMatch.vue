<template>
  <image-response-template>
    <div slot="description">Oh snap! No match...</div>
    <div slot="image">
      <v-img
        alt="emptyBox"
        contain
        src="../../assets/blank-canvas.webp"
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
  components: {
    ImageResponseTemplate
  }
};
</script>
