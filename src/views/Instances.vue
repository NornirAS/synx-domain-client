<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>
            Instances
          </h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'new-instances' }"
            :color="colorBlue"
            small
            rounded
            dark
          >
            Look for new instances
          </v-btn>
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
  data() {
    return {
      colorBlue: "#27AAE1"
    };
  },
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
      return this.$store.state.alarmModule.successMessage;
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("get_all_instances", this.token);
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
