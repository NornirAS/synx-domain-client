<template>
  <input-card>
    <div slot="title">Command Schema</div>
    <div slot="subtitle">
      A command elements to enable services that are linked to you to send you
      commands.
    </div>
    <v-textarea
      v-model="command"
      @blur="addCommand"
      :rules="commandRules"
      :counter="128"
      name="command"
      label="Type or paste service command"
      type="text"
      error-count="1"
      slot="action"
      outlined
      dense
    ></v-textarea>
  </input-card>
</template>

<script>
import _ from "lodash";
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      command: "<cmd>\n</cmd>",
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
  methods: {
    addCommand() {
      this.$store.commit("serviceFormModule/addCommand", this.command);
    }
  },
  computed: {
    removeNewLine() {
      return this.command.replace(/\n/g, "");
    },
    matchXml() {
      return this.removeNewLine.match(
        /(?<=<cmd>)<(.*?)>(.*?)<\/(.*?)>(?=<\/cmd>)/g
      );
    },
    containsCmdTag() {
      return this.removeNewLine.match(/<\/?cmd>/g) ? true : false;
    },
    commandRemoveCmdTag() {
      return this.removeNewLine.replace(/<\/?cmd>/gi, "");
    },
    commandContainsOnlyXml() {
      if (this.matchXml) {
        return this.matchXml.join("") === this.commandRemoveCmdTag;
      } else {
        return false;
      }
    },
    getXmlTagNames() {
      if (this.commandContainsOnlyXml) {
        return this.removeNewLine.match(/<\/?(.*?)>/g).map(str => {
          return str.replace(/\//g, "").match(/(?<=<)(.*?)(?=>)/g);
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
    InputCard
  }
};
</script>
