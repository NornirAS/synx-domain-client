<template>
  <form-input-card>
    <div slot="title">Web JS</div>
    <div slot="subtitle">
      WebJs is sent to the browser as html fil. Use WebJS to construct and
      generate web applications. Used when you dont have a webserver.
    </div>
    <v-textarea
      v-model="serviceWebJS"
      @blur="addServiceWebJS"
      :rules="webJSRules"
      :counter="256"
      error-count="1"
      name="web-js"
      type="text"
      label="Enter Web JS"
      slot="action"
      required
      outlined
      dense
    ></v-textarea>
  </form-input-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FormInputCard from "../FormInputCard";
export default {
  data() {
    return {
      serviceWebJS: "",
      webJSRules: [
        v => (v && v.length) <= 256 || "Web JS must be maximum 1024 character"
      ]
    };
  },
  mounted() {
    this.serviceWebJS = this.webJS;
  },
  methods: {
    ...mapMutations("serviceFormModule", ["addWebJS"]),
    addServiceWebJS() {
      this.addWebJS(this.serviceWebJS);
    }
  },
  computed: {
    ...mapState("serviceFormModule", ["webJS"])
  },
  components: {
    FormInputCard
  }
};
</script>
