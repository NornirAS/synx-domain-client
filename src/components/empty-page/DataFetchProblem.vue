<template>
  <image-response-template>
    <div slot="title">Can't fetch your data</div>
    <div slot="description">
      Please try again later or contact us if theproblem persists.
    </div>
    <div slot="action">
      <v-btn
        :to="{ name: 'create-domain' }"
        class="text-capitalize"
        rounded
        small
        color="info"
      >
        Write to us
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="warning"
        contain
        src="../../assets/warning.png"
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
