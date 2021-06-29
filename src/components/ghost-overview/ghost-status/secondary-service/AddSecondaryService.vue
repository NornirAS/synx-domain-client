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
    <v-btn class="ml-4" color="primary" type="submit">
      <v-icon>{{ mdiPlus }}</v-icon>
      Add to primary
    </v-btn>
  </v-form>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import { requiredRule, ghostUriRule } from "../../../../input-rules";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiPlus,
      title: "Ghost URI",
      uri: "",
      valid: false,
      uriRules: [
        v => requiredRule(v, this.title),
        v => ghostUriRule(v, this.title)
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
      const result = this.uri.match(/##\d+/);
      if (result !== null) {
        return result[0].replace(/##/, "");
      } else {
        return "";
      }
    }
  }
};
</script>
