<template>
  <v-form
    id="micropage-form"
    ref="micropageForm"
    v-model="valid"
    @submit.prevent="submitMicropageForm"
    lazy-validation
  >
    <micropage-description></micropage-description>
    <micropage-schema-description></micropage-schema-description>
    <micropage-image-url></micropage-image-url>
    <v-btn
      :style="actionBtnStyle"
      class="text-capitalize"
      type="submit"
      name="micropage-form"
      form="micropage-form"
      rounded
      dark
    >
      Update
    </v-btn>
  </v-form>
</template>

<script>
import MicropageDescription from "./MicropageDescription";
import MicropageSchemaDescription from "./MicropageSchemaDescription";
import MicropageImageUrl from "./MicropageImage";
export default {
  data() {
    return {
      valid: false,
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right",
        marginTop: "20px"
      }
    };
  },
  methods: {
    submitMicropageForm() {
      this.$refs.micropageForm.validate();
      if (this.$refs.micropageForm.validate()) {
        this.$socket.emit(
          "update_micropage",
          this.domain,
          this.service,
          this.formData,
          this.token
        );
      }
    }
  },
  computed: {
    formData() {
      return this.$store.state.serviceFormModule;
    },
    domain() {
      return this.$store.state.domainsModule.currentDomain;
    },
    token() {
      return this.$store.state.authModule.idToken;
    },
    service() {
      return this.formData.name;
    }
  },
  components: {
    MicropageDescription,
    MicropageSchemaDescription,
    MicropageImageUrl
  }
};
</script>
