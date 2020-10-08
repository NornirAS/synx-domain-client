<template>
  <form>
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
    <ServiceImage />
    <Micropage />
    <v-btn
      @click="submitForm"
      :color="colorBlue"
      style="float: right"
      rounded
      dark
      >Submit</v-btn
    >
  </form>
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
import Micropage from "./Micropage.vue";
import ServiceImage from "./textfield/ServiceImage";
export default {
  data() {
    return {
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    submitForm() {
      this.$socket.emit(
        "register-service",
        this.formData,
        this.username,
        this.token
      );
      this.$store.state.serviceForm = {
        name: null,
        description: null,
        keywords: [],
        serviceXML: [],
        commandXML: [],
        instances: null,
        timeout: "30"
      };
    }
  },
  computed: {
    formData() {
      return this.$store.state.serviceForm;
    },
    username() {
      return this.$store.state.username;
    },
    token() {
      return this.$store.state.idToken;
    }
  },
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
    PreMasterScript,
    Micropage,
    ServiceImage
  }
};
</script>
