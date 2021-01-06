<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col>
          <h1>
            Network Resources
          </h1>
        </v-col>
        <v-col align="right">
          <v-btn
            :to="{ name: 'new-instances' }"
            :color="colorBlue"
            class="text-capitalize"
            small
            rounded
            dark
          >
            Look for new ghosts
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="space-between" align="center">
        <v-col cols="12">
          <InstancesTable v-if="!isInstances" :instances="instances" />
          <v-img
            v-else
            alt="EmptyBox"
            contain
            src="../assets/empty-box.png"
            transition="scale-transition"
            height="300px"
          >
            <p class="font-weight-bold">
              You don't have any network resources...
            </p>
          </v-img>
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
    },
    isInstances() {
      return this.instances.length === 0 ? true : false;
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
p {
  margin: 0;
  color: #58595b;
  font-size: 16px;
}
</style>
