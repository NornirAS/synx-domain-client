<template>
  <form-input-card>
    <div slot="title">Command Setup</div>
    <div slot="subtitle">
      Enter your command schema definition. This schema is only used by
      secondary service providers to send action commands to your service. The
      commands need to be handled by your software agent.
    </div>
    <div slot="action" class="d-flex">
      <v-text-field
        @blur="addCommand(commandSchema)"
        v-model="serviceCommand.command"
        :rules="inputRules"
        class="mr-md-2"
        label="Command"
        type="text"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        @blur="addCommand(commandSchema)"
        v-model="serviceCommand.param1"
        :rules="inputRules"
        class="mx-md-1"
        label="Parameter1"
        type="text"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        @blur="addCommand(commandSchema)"
        v-model="serviceCommand.param2"
        :rules="inputRules"
        class="ml-md-2"
        label="Parameter2"
        type="text"
        outlined
        dense
      ></v-text-field>
    </div>
  </form-input-card>
</template>

<script>
import { getXml, getXmlElementNames } from "../../../utils";
import { systemParameters } from "../../../core/config";
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      inputRules: [
        v => !!v || "Required",

        v => (v && v.length) <= 16 || "Max length is 16",

        v =>
          (v && !systemParameters.includes(v.toLowerCase())) ||
          "This value is used by cioty",

        v => (v && /^\w+$/.test(v)) || "Use A-Z, a-z, 0-9 and _"
      ],
      serviceCommand: {
        command: "",
        param1: "",
        param2: ""
      }
    };
  },

  mounted() {
    if (this.hasCommand) {
      this.serviceCommand.command = this.commandFromXml[0];
      this.serviceCommand.param1 = this.commandFromXml[1];
      this.serviceCommand.param2 = this.commandFromXml[2];
    }
  },

  methods: {
    ...mapMutations("serviceForm", ["addCommand"])
  },

  computed: {
    ...mapState("serviceForm", ["command"]),
    commandSchema() {
      return getXml(this.serviceCommand, "CMD");
    },

    commandFromXml() {
      return getXmlElementNames(this.command);
    },

    hasCommand() {
      return this.commandFromXml ? true : false;
    }
  },
  components: {
    FormInputCard
  }
};
</script>
