<template>
  <image-response-template>
    <div slot="title">You have no ghosts to approve or deny</div>
    <div slot="action">
      <v-btn :to="{ name: 'ghosts' }" color="primary">
        Back to ghosts
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="emptyBox"
        contain
        src="../../assets/empty-box.png"
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
