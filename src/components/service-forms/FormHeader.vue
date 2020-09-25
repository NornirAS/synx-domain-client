<template>
  <div>
    <h1>{{ title }}</h1>
    <p>
      {{ description }} <a :href="url" target="_blank">{{ url }}</a>
    </p>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "url"]
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
