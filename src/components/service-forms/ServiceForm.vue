<template>
  <v-form>
    <ServiceName />
    <ServiceDescription />
    <ServiceKeywords />
    <ServiceImage />
    <v-row>
      <v-col cols="12" sm="6">
        <ServiceInstances />
      </v-col>
      <v-col cols="12" sm="6">
        <ServiceTimeout />
      </v-col>
    </v-row>
    <ServiceSchema />
    <CommandSchema />
    <SchemaDescription />
    <PreInlineScript />
    <PostInlineScript />
    <WebJS />
    <v-btn :to="{ name: 'services' }" :style="backBtnStyle" rounded dark>
      Go back
    </v-btn>
    <v-btn @click="submitForm" :style="actionBtnStyle" rounded dark>
      {{ btnName }}
    </v-btn>
  </v-form>
</template>

<script>
import ServiceName from "./textfield/ServiceName.vue";
import ServiceDescription from "./textarea/ServiceDescription.vue";
import ServiceKeywords from "./textfield/ServiceKeywords.vue";
import ServiceSchema from "./xml/ServiceSchema.vue";
import CommandSchema from "./xml/CommandSchema.vue";
import ServiceInstances from "./numberfield/ServiceInstances.vue";
import ServiceTimeout from "./numberfield/ServiceTimeout.vue";
import WebJS from "./textarea/WebJS.vue";
import PostInlineScript from "./textarea/PostInlineScript.vue";
import PreInlineScript from "./textarea/PreInlineScript.vue";
import ServiceImage from "./textfield/ServiceImage";
import SchemaDescription from "./textarea/SchemaDescription";
export default {
  props: ["btnName"],
  data() {
    return {
      title: this.$store.state.sideBarTitle,
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right",
        marginTop: "24px"
      },
      backBtnStyle: {
        backgroundColor: "#404B5F",
        marginTop: "24px"
      }
    };
  },
  methods: {
    submitForm() {
      if (this.title === "Create Service") {
        this.$socket.emit(
          "register_service",
          this.domain,
          this.formData,
          this.username,
          this.token
        );
      } else {
        console.log(this.instancesBalance);
        this.$store.commit(
          "serviceModule/updateInstances",
          this.instancesBalance
        );
        this.$socket.emit(
          "update_service",
          this.domain,
          this.formData,
          this.token
        );
      }
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    formData() {
      return this.serviceModule.serviceForm;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    instancesBalance() {
      return this.$store.getters["serviceModule/instancesBalance"];
    }
  },
  components: {
    ServiceName,
    ServiceDescription,
    ServiceKeywords,
    ServiceSchema,
    CommandSchema,
    ServiceInstances,
    ServiceTimeout,
    WebJS,
    PostInlineScript,
    PreInlineScript,
    ServiceImage,
    SchemaDescription
  }
};
</script>
