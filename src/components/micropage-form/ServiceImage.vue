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
  mounted() {
    this.image = this.imageUrl;
  },
  methods: {
    addImageUrl() {
      this.$store.commit("micropageFormModule/addImageUrl", this.image);
    }
  },
  computed: {
    imageUrl() {
      return this.$store.state.micropageFormModule.imageUrl;
    }
  },
  components: {
    InputCard: () => import("../FormInputCard")
  }
};
</script>
