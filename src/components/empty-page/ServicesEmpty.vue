<template>
  <empty-page-template>
    <div slot="title">You don't have any services yet..</div>
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
