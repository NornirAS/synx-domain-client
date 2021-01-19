<template>
  <empty-page-template>
    <div slot="title">You have no services yet...</div>
    <div slot="description">Create one</div>
    <div slot="action">
      <v-btn
        :to="{ name: 'serviceCreate' }"
        class="text-capitalize"
        rounded
        small
        color="primary"
      >
        Get Started
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
