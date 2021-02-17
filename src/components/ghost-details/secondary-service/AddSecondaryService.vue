<template>
  <v-form
    id="secondary-service"
    ref="secondaryService"
    v-model="valid"
    @submit.prevent="submitForm"
    lazy-validation
    class="d-flex justify-start"
  >
    <v-text-field
      v-model="uri"
      :rules="uriRules"
      error-count="1"
      outlined
      label="Ghost URI"
      type="text"
      dense
    >
    </v-text-field>
    <v-btn
      class="text-capitalize ml-4"
      color="primary"
      height="40px"
      type="submit"
    >
      <v-icon>{{ mdiPlus }}</v-icon>
      Add to primary
    </v-btn>
  </v-form>
</template>

<script>
import { mdiPlus } from "@mdi/js";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiPlus,
      uri: "",
      valid: false,
      ghostURIRegExp: /([a-zA-Z_]+?)(?=\.)\.cioty.com(?=\/)\/([a-zA-Z_]+?)(?=#)#\d+/,
      uriRules: [
        v => !!v || "URI is required",
        v => this.ghostURIRegExp.test(v) || "Ghost URI must be valid"
      ]
    };
  },
  methods: {
    submitForm() {
      const isFormValid = this.$refs.secondaryService.validate();
      if (isFormValid) {
        this.$socket.emit("add_primary_ghost", {
          domain: this.ghost.domain,
          service: this.ghost.service,
          token: this.token,
          instance: this.ghost.instance,
          refDomain: this.refDomain,
          refService: this.refService,
          refObjectID: this.refObjectID
        });
      }
    }
  },
  computed: {
    refDomain() {
      const result = this.uri.match(/(.*?)(?=\.)/);
      if (result !== null) {
        return result[0];
      } else {
        return "";
      }
    },
    refService() {
      const result = this.uri.match(/(\w+)(?=#)/);
      if (result !== null) {
        return result[0];
      } else {
        return "";
      }
    },
    refObjectID() {
      const result = this.uri.match(/#\d+/);
      if (result !== null) {
        return result[0].replace(/#/, "");
      } else {
        return "";
      }
    }
  }
};
</script>
