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
    <empty-page-template>
      <div slot="title">404</div>
      <div slot="description">
        This page has run away!
      </div>
      <div slot="action">
        <v-btn
          :to="{ name: 'domains' }"
          class="text-capitalize"
          text
          small
          color="primary"
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
    </empty-page-template>
  </div>
</template>

<script>
import EmptyPageTemplate from "./EmptyPageTemplate";
export default {
  components: {
    EmptyPageTemplate
  }
};
</script>

<style>
.image-center {
  margin: 4em 0;
  width: 100px;
}
</style>
