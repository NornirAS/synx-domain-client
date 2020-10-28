<template>
  <div>
    <h1>
      {{ title }}
      <v-btn
        :style="btnStyle"
        :to="{ name: 'editService', params: { index } }"
        outlined
        rounded
        x-small
        ligth
      >
        Edit <v-icon x-small>{{ icon }}</v-icon>
      </v-btn>
    </h1>
    <p>
      {{ description }} <a :href="url" target="_blank">{{ url }}</a>
    </p>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "index", "url", "icon"],
  data() {
    return {
      btnStyle: {
        color: "#58595B"
      }
    };
  },
  methods: {
    editService(index) {
      this.$store.commit("editService", index);
    }
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 20px;
  font-weight: 500;
}
p {
  color: #58595b;
  font-size: 14px;
  margin-bottom: 0.3em;
}
a {
  color: #27aae1;
}
</style>
