<template>
  <v-alert v-model="open" :type="type" dense text>
    {{ alert.message }}
  </v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["alert", "index"],
  data() {
    return {
      open: true
    };
  },
  created() {
    this.removeAlert();
  },
  methods: {
    ...mapActions("alarmModule", ["removeAlert"])
  },
  computed: {
    type() {
      return this.alert.success === true ? "success" : "error";
    }
  }
};
</script>
