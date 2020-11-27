<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <v-btn
      :style="btnStyle"
      :to="{ name: 'serviceUpdate', params: { index } }"
      outlined
      rounded
      x-small
      ligth
    >
      Edit <v-icon x-small>{{ icon }}</v-icon>
    </v-btn>
    <v-btn
      :style="btnStyle"
      :to="{ name: 'serviceUpdate', params: { index } }"
      outlined
      rounded
      x-small
      ligth
    >
      Update Micropage <v-icon x-small>{{ icon }}</v-icon>
    </v-btn>
    <AddInstances :index="index" :btnStyle="btnStyle" />
    <ActiveChannels :title="title" :index="index" :btnStyle="btnStyle" />
    <p>
      {{ description }} <a :href="url" target="_blank">{{ urlToLoweCase }}</a>
    </p>
  </div>
</template>

<script>
import ActiveChannels from "./ActiveChannels";
import AddInstances from "./AddInstances";
export default {
  props: ["title", "description", "index", "url", "icon"],
  data() {
    return {
      btnStyle: {
        color: "#58595B",
        margin: "0.3em 1em 0.3em 0"
      }
    };
  },
  computed: {
    urlToLoweCase() {
      return this.url.toLowerCase();
    }
  },
  components: {
    ActiveChannels,
    AddInstances
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
