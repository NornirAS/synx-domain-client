<template>
  <v-card v-if="!noServices">
    <div class="title mb-2">Add a ghost</div>
    <div class="body-1">
      Choose the morphic service you want to add the ghost to.
    </div>
    <div class="d-flex justify-start my-4">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-none full-wide"
            color="primary"
            v-bind="attrs"
            v-on="on"
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
      <v-btn
        @click="addGhost"
        color="primary"
        class="ml-4"
        :disabled="isGhostLimit"
      >
        Add ghost
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
import { rootDomain } from "../../core/config";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      mdiMenuDown,
      rootDomain,
      domain: "",
      service: ""
    };
  },
  mounted() {
    if (!this.noServices) {
      this.domain = this.firstService.domain;
      this.service = this.firstService.serviceName;
    }
  },
  methods: {
    selectService(domain, service) {
      this.domain = domain;
      this.service = service;
    },
    addGhost() {
      this.$socket.emit("add_ghost", {
        domain: this.domain,
        service: this.service,
        token: this.token,
        instancesToAdd: "1"
      });
    }
  },
  computed: {
    ...mapState("authentication", ["token"]),
    ...mapState("services", ["services"]),
    ...mapGetters("services", ["noServices"]),
    ...mapGetters("ghosts", ["isGhostLimit"]),
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
