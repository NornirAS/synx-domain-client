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
import { encode } from "html-entities";
import { mapState, mapGetters, mapMutations } from "vuex";
import ServiceImage from "./ServiceImage";
import ServiceDescription from "./ServiceDescription";
import SchemaDescription from "./schema-description/SchemaDescription";
import CommandDescription from "./command-description/CommandDescription";
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
          serviceDescription: this.b64EncodedServiceDescription,
          schemaDescription: this.b64EncodedSchemaDescription,
          commandDescription: this.b64EncodedCommandDescription,
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
      "commandOverview",
      "imageUrl"
    ]),
    ...mapGetters("serviceForm", ["serviceURL"]),
    b64EncodedServiceDescription() {
      let str = this.serviceDescription;
      str = str.replace(/"/g, "'");
      const encodedDescription = encode(str, {
        mode: "nonAsciiPrintable"
      });
      const b64Encoded = btoa(encodedDescription);
      return b64Encoded;
    },
    b64EncodedSchemaDescription() {
      const string = JSON.stringify(this.encodedSchemaDescription);
      const b64Encoded = btoa(string);
      return b64Encoded;
    },
    b64EncodedCommandDescription() {
      const string = JSON.stringify(this.encodedCommandDescription);
      const b64Encoded = btoa(string);
      return b64Encoded;
    },
    encodedSchemaDescription() {
      let obj = this.schemaOverview;
      obj.description = obj.description.replace(/"/g, "'");
      obj.description = encode(obj.description, {
        mode: "nonAsciiPrintable"
      });
      obj.elements = obj.elements.map(el => {
        el.description = el.description.replace(/"/g, "'");
        el.description = encode(el.description, {
          mode: "nonAsciiPrintable"
        });
        return el;
      });
      return obj;
    },
    encodedCommandDescription() {
      let obj = this.commandOverview;
      obj.description = obj.description.replace(/"/g, "'");
      obj.description = encode(obj.description, {
        mode: "nonAsciiPrintable"
      });
      obj.commands = obj.commands.map(cmd => {
        cmd.description = cmd.description.replace(/"/g, "'");
        cmd.description = encode(cmd.description, {
          mode: "nonAsciiPrintable"
        });
        return cmd;
      });
      return obj;
    }
  },
  components: {
    ServiceImage,
    ServiceDescription,
    SchemaDescription,
    CommandDescription
  }
};
</script>
