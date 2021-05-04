<template>
  <v-card>
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
      <service-description
        :service="name"
        :url="serviceURL"
      ></service-description>
      <schema-description></schema-description>
      <command-description></command-description>
      <service-image></service-image>
      <div>
        <v-btn @click="backToServices" color="primary" text>
          Cancel
        </v-btn>
        <v-btn
          class="float-right"
          color="primary"
          type="submit"
          form="micropage-form"
        >
          Save
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import ServiceImage from "./ServiceImage";
import ServiceDescription from "./ServiceDescription";
import SchemaDescription from "./SchemaDescription";
import CommandDescription from "./CommandDescription";
export default {
  data() {
    return {
      valid: false
    };
  },
  created() {
    this.$socket.emit("fetch_micropage", this.serviceURL);
  },
  beforeDestroy() {
    this.resetState();
  },
  methods: {
    ...mapMutations("micropageForm", ["resetState"]),
    submitMicropageForm() {
      const isFormValid = this.$refs.micropageForm.validate();
      if (isFormValid) {
        this.$socket.emit("update_micropage", {
          token: this.token,
          domain: this.domain,
          service: this.name,
          serviceDescription: this.serviceDescription,
          schemaDescription: JSON.stringify(this.schemaOverview),
          commandDescription: this.commandDescription,
          imageUrl: this.imageUrl
        });
      }
    },
    backToServices() {
      this.$router.push({ name: "services" });
    }
  },
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("serviceForm", ["domain", "name"]),
    ...mapState("micropageForm", [
      "serviceDescription",
      "schemaOverview",
      "commandDescription",
      "imageUrl"
    ]),
    ...mapGetters("serviceForm", ["serviceURL"])
  },
  components: {
    ServiceImage,
    ServiceDescription,
    SchemaDescription,
    CommandDescription
  }
};
</script>
