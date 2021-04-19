<template>
  <image-response-template>
    <div slot="title">You have no services yet</div>
    <div slot="description">Services will appear here once you add them</div>
    <div slot="action">
      <v-btn :to="{ name: 'serviceCreate' }" color="primary">
        Create Service
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="emptyBox"
        contain
        src="../../assets/empty-box.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </image-response-template>
</template>

<script>
import ImageResponseTemplate from "../globals/ImageResponseTemplate";
export default {
  components: {
    ImageResponseTemplate
  }
};
</script>
