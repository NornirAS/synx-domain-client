<template>
  <empty-page-template>
    <div slot="description">Oh snap! No match...</div>
    <div slot="image">
      <v-img
        alt="emptyBox"
        contain
        src="../../assets/blank-canvas.png"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </empty-page-template>
</template>

<script>
import EmptyPageTemplate from "./EmptyPageTemplate";
export default {
  components: {
    EmptyPageTemplate
  }
};
</script>
