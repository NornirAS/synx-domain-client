<template>
  <div>
    <div style="height: 45px">
      <span class="primary-value">{{ primaryValue }}</span>
      <span class="secondary-value">{{ secondaryValue }}</span>
    </div>
    <p>{{ helper }}</p>
  </div>
</template>

<script>
export default {
  props: ["primaryValue", "secondaryValue", "helper"]
};
</script>

<style scoped>
.p {
  margin: 0;
  color: #58595b;
  font-size: 14px;
}
.primary-value {
  color: #27aae1;
  font-size: 40px;
  font-weight: 500;
}
.secondary-value {
  color: #58595b;
  font-size: 30px;
  font-weight: 500;
}
</style>
