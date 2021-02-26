<template>
  <v-form
    id="micropage-form"
    ref="micropageForm"
    v-model="valid"
    @submit.prevent="submitMicropageForm"
    lazy-validation
  >
    <div class="title">Micropage - Information for Humans</div>
    <div class="body-1">
      The micropage tells yourself and other humans what your service is all
      about. The page will be visible to everyone entering the URL.
    </div>
    <service-description></service-description>
    <schema-description></schema-description>
    <service-image></service-image>
    <div>
      <v-btn
        @click="backToServices"
        class="text-capitalize"
        color="secondary"
        text
      >
        Cancel
      </v-btn>
      <v-btn
        class="text-capitalize"
        color="primary"
        type="submit"
        form="micropage-form"
        small
        rounded
      >
        Save
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ServiceImage from "./ServiceImage";
import ServiceDescription from "./ServiceDescription";
import SchemaDescription from "./SchemaDescription";
export default {
  data() {
    return {
      valid: false
    };
  },
  created() {
    this.$socket.emit("fetch_micropage", this.serviceURL);
  },
  methods: {
    submitMicropageForm() {
      const isFormValid = this.$refs.micropageForm.validate();
      if (isFormValid) {
        this.$socket.emit("update_micropage", {
          token: this.token,
          domain: this.domain,
          service: this.name,
          serviceDescription: this.ServiceDescription,
          schemaDescription: this.SchemaDescription,
          imageUrl: this.imageUrl
        });
      }
    },
    backToServices() {
      this.$router.push({ name: "services" });
    }
  },
  computed: {
    ...mapState("authModule", ["token"]),
    ...mapState("serviceFormModule", ["domain", "name"]),
    ...mapState("micropageFormModule", [
      "serviceDescription",
      "schemaDescription",
      "imageUrl"
    ]),
    ...mapGetters("serviceFormModule", ["serviceURL"])
  },
  components: {
    ServiceImage,
    ServiceDescription,
    SchemaDescription
  }
};
</script>
