<template>
  <v-card>
    <div class="title mb-2">Add a ghost</div>
    <div class="body-1">
      Choose the morphic service you want to add the ghost to.
    </div>
    <div class="d-flex justify-start my-4">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-none full-wide"
            color="secondary"
            v-bind="attrs"
            v-on="on"
            outlined
          >
            {{ domain }}{{ rootDomain
            }}<span class="font-weight-bold">{{ service }}</span>
            <v-icon right large>{{ mdiMenuDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="({ domain, serviceName }, index) in services"
            :key="index"
          >
            <v-list-item-title @click="selectService(domain, serviceName)">
              {{ domain }}{{ rootDomain }}{{ serviceName }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="addGhost" color="primary" class="text-capitalize ml-4">
        Add ghost
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
import { rootDomain } from "../../core/config";
export default {
  data() {
    return {
      mdiMenuDown,
      rootDomain,
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
      return this.$store.getters["servicesModule/servicesFromStorage"];
    },
    firstService() {
      return this.services[0];
    }
  }
};
</script>

<style scoped>
.full-wide {
  flex: 1 1 auto;
}
</style>
