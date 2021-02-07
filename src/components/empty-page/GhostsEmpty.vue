<template>
  <empty-page-template>
    <div slot="title">You Need a Service</div>
    <div slot="description">
      Ghosts will appear here once you create a morphic service
    </div>
    <div slot="action">
      <v-btn
        :to="{ name: 'serviceCreate' }"
        class="text-capitalize"
        rounded
        small
        color="primary"
      >
        Create Service
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="productTeardown"
        contain
        src="../../assets/product-teardown.webp"
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
