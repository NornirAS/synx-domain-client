<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col cols="12">
          <h1>
            Instances
          </h1>
        </v-col>
      </v-row>
      <v-row justify="space-between" align="center">
        <v-col cols="12">
          <InstancesTable :instances="instances" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InstancesTable from "../components/instance/InstancesTable";
export default {
  created() {
    this.$socket.emit("get_all_instances", this.token);
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    instances() {
      return this.$store.state.instancesModule.instances;
    },
    successMessage() {
      return this.$store.state.instancesModule.successMessage;
    }
  },
  watch: {
    successMessage(newValue) {
      if (newValue !== null) {
        alert(newValue);
      }
    }
  },
  components: {
    InstancesTable
  }
};
</script>

<style scoped>
h1 {
  color: #58595b;
  font-size: 24px;
  font-weight: 500;
}
</style>
