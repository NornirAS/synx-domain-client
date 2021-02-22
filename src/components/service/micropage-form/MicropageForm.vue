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
export default {
  data() {
    return {
      valid: false
    };
  },
  created() {
    this.$socket.emit("fetch_micropage", this.micropageURL);
  },
  beforeDestroy() {
    this.$store.commit("micropageFormModule/resetState");
  },
  methods: {
    submitMicropageForm() {
      const isFormValid = this.$refs.micropageForm.validate();
      if (isFormValid) {
        this.$socket.emit("update_micropage", this.updateMicropageParams);
      }
    },
    backToServices() {
      this.$router.push({ name: "services" });
    }
  },
  computed: {
    updateMicropageParams() {
      return this.$store.getters["micropageFormModule/updateMicropageParams"];
    },
    micropageURL() {
      return this.$store.getters["serviceFormModule/serviceURL"];
    }
  },
  components: {
    ServiceImage: () => import("./ServiceImage"),
    ServiceDescription: () => import("./ServiceDescription"),
    SchemaDescription: () => import("./SchemaDescription")
  }
};
</script>
