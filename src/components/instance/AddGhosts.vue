<template>
  <v-card>
    <v-container>
      <div class="title">Add a ghost</div>
      <div class="body-1">
        Choose the morphic service you want to add the ghost to.
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-none domain-dropdown"
            color="white"
            v-bind="attrs"
            v-on="on"
          >
            <strong>{{ firstService.domain }}</strong>
            .cioty.com/
            <strong>{{ firstService.serviceName }}</strong>
            <v-icon right large>{{ mdiMenuDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="({ domain, serviceName }, index) in services"
            :key="index"
          >
            <v-list-item-title @click="selectService(domain, serviceName)">
              {{ domain }}.cioty.com/{{ serviceName }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        @click="addGhost"
        color="primary"
        class="text-capitalize"
        slot="action"
      >
        Add ghost
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
export default {
  data() {
    return {
      mdiMenuDown,
      domain: "",
      service: "",
      instanceToAdd: "1"
    };
  },
  mounted() {
    this.domain = this.firstService.domain;
    this.service = this.firstService.serviceName;
  },
  methods: {
    selectService(domain, service) {
      (this.domain = domain), (this.service = service);
      // add to store
    },
    addGhost() {
      this.$socket.emit(
        "add_instances",
        this.domain,
        this.service,
        this.token,
        this.instanceToAdd
      );
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    services() {
      const services = localStorage.getItem("services");
      return JSON.parse(services);
    },
    firstService() {
      return this.services[0];
    }
  }
};
</script>
