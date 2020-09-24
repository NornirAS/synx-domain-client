<template>
  <div>
    <ServiceName />
    <ServiceDescription />
    <Keywords />
    <ServiceXML />
    <CommandXML />
    <Instances />
    <Timeout />
    <WebJS />
    <PostMasterScript />
    <PreMasterScript />
  </div>
</template>

<script>
import ServiceName from "./textfield/ServiceName.vue";
import ServiceDescription from "./textarea/ServiceDescription.vue";
import Keywords from "./textfield/Keywords.vue";
import ServiceXML from "./xml/ServiceXML.vue";
import CommandXML from "./xml/CommandXML.vue";
import Instances from "./numberfield/Instances.vue";
import Timeout from "./numberfield/Timeout.vue";
import WebJS from "./textarea/WebJS.vue";
import PostMasterScript from "./textarea/PostMasterScript.vue";
import PreMasterScript from "./textarea/PreMasterScript.vue";
export default {
  components: {
    ServiceName,
    ServiceDescription,
    Keywords,
    ServiceXML,
    CommandXML,
    Instances,
    Timeout,
    WebJS,
    PostMasterScript,
    PreMasterScript
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
