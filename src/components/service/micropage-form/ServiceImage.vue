<template>
  <input-card>
    <div slot="title">Image</div>
    <div slot="subtitle">
      Upload relevant image you own or have the rights to use. Free images can
      be found at pexels.com or unsplash.com
    </div>
    <v-text-field
      v-model="image"
      @blur="addImageUrl"
      name="imageUrl"
      label="Image URL"
      type="text"
      slot="action"
      outlined
      dense
    ></v-text-field>
  </input-card>
</template>

<script>
export default {
  data() {
    return {
      image: ""
    };
  },
  methods: {
    addImageUrl() {
      this.$store.commit("micropageFormModule/addImageUrl", this.image);
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
