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
        label="Command"
        type="text"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        @blur="addCommand(commandSchema)"
        v-model="serviceCommand.param1"
        label="Parameter1"
        type="text"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        @blur="addCommand(commandSchema)"
        v-model="serviceCommand.param2"
        label="Parameter2"
        type="text"
        outlined
        dense
      ></v-text-field>
    </div>
  </form-input-card>
</template>

<script>
import { getXml, xmlElementNames } from "../../../utils";
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../../globals/FormInputCard";
export default {
  data() {
    return {
      serviceCommand: {
        command: "",
        param1: "",
        param2: ""
      }
    };
  },

  mounted() {
    this.serviceCommand.command = this.commandFromXml[0];
    this.serviceCommand.param1 = this.commandFromXml[1];
    this.serviceCommand.param2 = this.commandFromXml[2];
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
      return xmlElementNames(this.command);
    }
  },
  components: {
    FormInputCard
  }
};
</script>
