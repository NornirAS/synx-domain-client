<template>
  <v-row justify="start" class="mt-md-10 mx-md-10">
    <v-col cols="12" md="10" lg="8" xl="5">
      <slot name="page-title"></slot>
    </v-col>
    <v-col cols="12" md="10" lg="8" xl="5">
      <slot name="alert"></slot>
      <div>
        <slot name="page-content"></slot>
      </div>
    </v-col>
    <v-col md="2" lg="4" xl="3">
      <slot name="page-content-right"></slot>
      <v-list class="parent">
        <v-list-item v-for="(alert, index) in alerts" :key="index" class="pl-0">
          <alert-message :alert="alert" :index="index"></alert-message>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import AlertMessage from "./AlertMessage";
export default {
  computed: {
    alerts() {
      return this.$store.state.alert.alerts;
    }
  },
  components: {
    AlertMessage
  }
};
</script>

<style scoped>
.parent {
  max-height: 50%;
  overflow: scroll;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  background: transparent !important;
}
</style>
