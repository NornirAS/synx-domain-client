<template>
  <form-input-card>
    <div slot="title">Command Schema</div>
    <div slot="subtitle">
      Enter your command schema definition. This schema is only used by
      secondary service providers to send action commands to your service. The
      commands need to be handled by your software agent.
    </div>
    <v-textarea
      v-model="serviceCommand"
      @blur="addCommand(serviceCommand)"
      :rules="commandRules"
      :counter="128"
      name="command"
      label="Enter command schema"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceCommand: "<CMD>\n</CMD>",
      commandRules: [
        v =>
          (v && v.length) <= 128 ||
          "Command schema must be maximum 128 characters",
        v =>
          !v ||
          this.commandContainsOnlyXml ||
          "You need to provide valid XML command schema",
        v =>
          !v ||
          this.isElementsMatch ||
          "Command schema open and closing tags must match"
      ]
    };
  },
  mounted() {
    this.serviceCommand = this.command;
  },
  methods: {
    ...mapMutations("serviceForm", ["addCommand"])
  },
  computed: {
    ...mapState("serviceForm", ["command"]),
    removeNewLine() {
      return this.serviceCommand.replace(/\n/g, "");
    },
    matchXml() {
      return this.removeNewLine.slice(5, -6);
    },
    containsCmdTag() {
      return this.removeNewLine.match(/<\/?CMD>/g) ? true : false;
    },
    commandRemoveCmdTag() {
      return this.removeNewLine.replace(/<\/?CMD>/gi, "");
    },
    commandContainsOnlyXml() {
      if (this.matchXml) {
        return this.matchXml === this.commandRemoveCmdTag;
      } else if (this.containsCmdTag) {
        return true;
      } else {
        return false;
      }
    },
    getXmlTagNames() {
      if (this.commandContainsOnlyXml) {
        return this.removeNewLine.match(/<\/?(.*?)>/g).map(str => {
          return str.replace(/\//g, "").slice(1, -1);
        });
      } else {
        return [];
      }
    },
    mergeXmlTagNamesInSingleArray() {
      return _.flattenDeep(this.getXmlTagNames);
    },
    removeDuplicateNames() {
      return _.uniq(this.mergeXmlTagNamesInSingleArray);
    },
    isElementsMatch() {
      if (this.commandContainsOnlyXml) {
        return (
          this.mergeXmlTagNamesInSingleArray.length / 2 ===
          this.removeDuplicateNames.length
        );
      } else {
        return false;
      }
    }
  },
  components: {
    FormInputCard
  }
};
</script>
