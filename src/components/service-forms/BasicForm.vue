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
import ServiceDescription from "./textarea/ServiceDescription.vue";
import Keywords from "./single-line-form/Keywords.vue";
import ServiceXML from "./xml-form/ServiceXML.vue";
import CommandXML from "./xml-form/CommandXML.vue";
import Instances from "./numeric-form/Instances.vue";
import Timeout from "./numeric-form/Timeout.vue";
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
</style>
