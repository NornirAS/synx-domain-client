<template>
  <div>
    <ServiceName />
    <ServiceDescription />
    <Keywords />
    <ServiceXML />
    <CommandXML />
    <Instances />
    <Timeout />
  </div>
</template>

<script>
import ServiceName from "./single-line-form/ServiceName.vue";
import ServiceDescription from "./ServiceDescription.vue";
import Keywords from "./single-line-form/Keywords.vue";
import ServiceXML from "./xml-form/ServiceXML.vue";
import CommandXML from "./xml-form/CommandXML.vue";
import Instances from "./numeric-form/Instances.vue";
import Timeout  from "./numeric-form/Timeout.vue";
export default {
  components: {
    ServiceName,
    ServiceDescription,
    Keywords,
    ServiceXML,
    CommandXML,
    Instances,
    Timeout
  }
};
</script>

<style>
.v-card {
  margin: 0 0 1em 0;
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
