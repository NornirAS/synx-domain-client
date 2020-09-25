<template>
  <div>
    <div :style="divHeight">
      <span :style="primaryStyle">{{ primaryValue }}</span>
      <span :style="secondaryStyle">{{ secondaryValue }}</span>
    </div>
    <p>{{ helper }}</p>
  </div>
</template>

<script>
export default {
  props: [
    "primaryValue",
    "secondaryValue",
    "helper",
    "primaryStyle",
    "secondaryStyle",
    "divHeight"
  ]
};
</script>

<style scoped>
p {
  margin: 0;
  color: #58595b;
  font-size: 14px;
}
</style>
