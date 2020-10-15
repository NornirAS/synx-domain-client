<template>
  <div>
    <h1>
      {{ title }}
      <v-btn
        :style="btnStyle"
        :to="{ name: 'updateService' }"
        outlined
        rounded
        x-small
        ligth
      >
        Update <v-icon x-small>{{ icon }}</v-icon>
      </v-btn>
    </h1>
    <p>
      {{ description }} <a :href="url" target="_blank">{{ url }}</a>
    </p>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "url", "icon"],
  data() {
    return {
      btnStyle: {
        color: "#58595B",
        marginBottom: "0.3em"
      }
    };
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
