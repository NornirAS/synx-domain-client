<template>
  <empty-page-template>
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
        color="primary"
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
