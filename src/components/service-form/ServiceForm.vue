<template>
  <v-form
    id="service-form"
    ref="serviceForm"
    v-model="serviceValid"
    @submit.prevent="submitServiceForm"
    lazy-validation
  >
    <service-form-name></service-form-name>
    <service-form-description></service-form-description>
    <service-form-keywords></service-form-keywords>
    <service-form-timeout></service-form-timeout>
    <service-form-schema></service-form-schema>
    <service-form-command></service-form-command>
    <service-form-pre-inline-script></service-form-pre-inline-script>
    <service-form-post-inline-script></service-form-post-inline-script>
    <service-form-web-js></service-form-web-js>
    <v-btn
      v-if="isEditPage"
      @click="deleteService"
      :style="deleteBtnStyle"
      class="text-capitalize"
      text
    >
      Delete Service
    </v-btn>
    <v-btn
      :style="actionBtnStyle"
      class="text-capitalize"
      type="submit"
      name="service-form"
      form="service-form"
      rounded
      dark
    >
      {{ btnName }}
    </v-btn>
  </v-form>
</template>

<script>
import ServiceFormName from "./ServiceFormName";
import ServiceFormDescription from "./ServiceFormDescription";
import ServiceFormKeywords from "./ServiceFormKeywords";
import ServiceFormTimeout from "./ServiceFormTimeout";
import ServiceFormSchema from "./ServiceFormSchema";
import ServiceFormCommand from "./ServiceFormCommand";
import ServiceFormPreInlineScript from "./ServiceFormPreInlineScript";
import ServiceFormPostInlineScript from "./ServiceFormPostInlineScript";
import ServiceFormWebJs from "./ServiceFormWebJS";
export default {
  props: ["btnName"],
  data() {
    return {
      serviceValid: false,
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right",
        marginTop: "12px"
      },
      deleteBtnStyle: {
        color: "#FF6666",
        marginTop: "12px"
      }
    };
  },
  methods: {
    submitServiceForm() {
      this.$refs.serviceForm.validate();
      if (this.$refs.serviceForm.validate()) {
        if (!this.isEditPage) {
          this.$socket.emit(
            "register_service",
            this.domain,
            this.formData,
            this.username,
            this.token
          );
        } else {
          this.$socket.emit(
            "update_service",
            this.domain,
            this.formData,
            this.token
          );
        }
      }
    },
    deleteService() {
      const instance = "0";
      this.$socket.emit(
        "delete_service",
        this.domain,
        this.service,
        this.token,
        instance
      );
    }
  },
  computed: {
    formData() {
      return this.$store.state.serviceFormModule;
    },
    isEditPage() {
      return this.$route.params.index >= 0;
    },
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    service() {
      return this.formData.name;
    }
  },
  components: {
    ServiceFormName,
    ServiceFormDescription,
    ServiceFormKeywords,
    ServiceFormTimeout,
    ServiceFormSchema,
    ServiceFormCommand,
    ServiceFormPreInlineScript,
    ServiceFormPostInlineScript,
    ServiceFormWebJs
  }
};
</script>
