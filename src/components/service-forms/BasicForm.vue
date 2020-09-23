<template>
  <div>
    <ServiceName />
    <ServiceDescription />
    <Keywords />
    <ServiceXML />
    <CommandXML />
  </div>
</template>

<script>
import ServiceName from "./single-line-form/ServiceName.vue";
import ServiceDescription from "./ServiceDescription.vue";
import Keywords from "./single-line-form/Keywords.vue";
import ServiceXML from "./xml-form/ServiceXML.vue";
import CommandXML from "./xml-form/CommandXML.vue";
export default {
  components: {
    ServiceName,
    ServiceDescription,
    Keywords,
    ServiceXML,
    CommandXML
  }
};
</script>

<style scoped>
.v-card {
  padding: 0.5em 2em 1em 2em;
  width: 75%;
}
.v-card > h2 {
  color: #58595b;
  font-size: 20px;
  font-weight: 500;
}
.v-card > p {
  color: #58595b;
  font-size: 14px;
  margin-bottom: 0.3em;
}
</style>
