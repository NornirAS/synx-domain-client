<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>Create a Domain</h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'domains' }"
            :color="colorLightGrey"
            class="text-capitalize"
            rounded
            small
            dark
          >
            <v-icon small>{{ mdiUndoVariant }}</v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <DomainForm />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import DomainForm from "../components/DomainForm";
import { mdiUndoVariant } from "@mdi/js";
export default {
  data() {
    return {
      mdiUndoVariant,
      colorLightGrey: "#404B5F"
    };
  },
  computed: {
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$router.push({ name: "domains" });
    }
  },
  components: {
    DomainForm
  }
};
</script>
