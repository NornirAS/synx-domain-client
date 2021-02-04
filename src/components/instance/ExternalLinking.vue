<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="(link, index) in linksURL" :key="index">
          <td class="body-1">{{ link.url }}</td>
          <td>
            <v-switch
              @change="allowDenyLinking(link.name, link.active)"
              v-model="link.active"
              :label="link.active === true ? 'Yes' : 'No'"
              class="float-right"
              inset
            ></v-switch>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["token", "ghost"],
  data() {
    return {};
  },
  methods: {
    allowDenyLinking(name, active) {
      this.$socket.emit("external_linking", {
        domain: this.ghost.domain,
        service: this.ghost.service,
        token: this.token,
        instance: this.ghost.instance,
        linkedTo: name,
        status: active
      });
    }
  },
  computed: {
    links() {
      return this.$store.state.instancesModule.ghostStatus["Linked To"];
    },
    linksURL() {
      return this.links.map(link => {
        const url = link.name.replace(/\//g, ".cioty.com/");
        link.url = url.toLowerCase();
        return link;
      });
    }
  }
};
</script>
