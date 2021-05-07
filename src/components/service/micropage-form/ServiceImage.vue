<template>
  <form-input-card>
    <div slot="title">Image</div>
    <div slot="subtitle">
      Upload relevant image you own or have the rights to use. Free images can
      be found at pexels.com or unsplash.com
    </div>
    <v-text-field
      v-model="image"
      @blur="addImageUrl(image)"
      name="imageUrl"
      label="Image URL"
      type="text"
      slot="action"
      outlined
      dense
    ></v-text-field>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../../globals/FormInputCard";
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
    ...mapMutations("micropageForm", ["addImageUrl"])
  },

  computed: {
    ...mapState("micropageForm", ["imageUrl"])
  },

  watch: {
    imageUrl(newValue) {
      this.image = newValue;
    }
  },

  components: {
    FormInputCard
  }
};
</script>
