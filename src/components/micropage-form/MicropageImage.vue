<template>
  <input-card>
    <div slot="title">Image URL</div>
    <div slot="subtitle">
      Url to image which can represent your service.
    </div>
    <v-text-field
      v-model="imageUrl"
      @blur="addImageUrl"
      :rules="imageUrlRules"
      :counter="254"
      name="image-url"
      label="Image URL"
      type="text"
      error-count="2"
      slot="action"
      required
      outlined
      dense
    ></v-text-field>
  </input-card>
</template>

<script>
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      imageUrl: "",
      imageUrlRules: [
        v => !!v || "URL is required",
        v => (v && v.length) <= 254 || "URL must be maximum 254 character"
      ]
    };
  },
  methods: {
    addImageUrl() {
      this.$store.commit("micropageFormModule/addImgeUrl", this.imageUrl);
    }
  },
  components: {
    InputCard
  }
};
</script>
