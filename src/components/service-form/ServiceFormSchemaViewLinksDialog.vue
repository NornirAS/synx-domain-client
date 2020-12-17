<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="colorLightGrey"
          :dark="!isLinks"
          v-bind="attrs"
          v-on="on"
          x-small
          rounded
          :disabled="isLinks"
        >
          View
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          Links
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Domain</th>
                  <th class="text-center">Service</th>
                  <th class="text-center">Variable</th>
                  <th class="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(link, index) in links" :key="index">
                  <td>{{ link.domain }}</td>
                  <td class="text-center">
                    {{ link.service }}
                  </td>
                  <td class="text-center">
                    {{ link.variable }}
                  </td>
                  <td class="text-center">
                    <service-form-schema-add-links-dialog
                      :elementIndex="elementIndex"
                      :link="link"
                      :linkIndex="index"
                    >
                    </service-form-schema-add-links-dialog>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCheck, mdiClose, mdiDelete } from "@mdi/js";
import ServiceFormSchemaAddLinksDialog from "./ServiceFormSchemaAddLinksDialog.vue";
export default {
  props: ["elementIndex"],
  data() {
    return {
      mdiCheck,
      mdiClose,
      mdiDelete,
      actionBtnStyle: {
        backgroundColor: "#27AAE1",
        float: "right"
      },
      cancelBtnStyle: {
        backgroundColor: "#404B5F"
      },
      colorLightGrey: "#404B5F",
      colorRed: "#FF6666",
      dialog: false
    };
  },
  computed: {
    links() {
      return this.$store.state.serviceFormModule.serviceSchema[
        this.elementIndex
      ].links;
    },
    isLinks() {
      return this.links.length === 0 ? true : false;
    }
  },
  watch: {
    isLinks(newValue) {
      if (newValue === true) {
        this.dialog = false;
      }
    }
  },
  components: {
    ServiceFormSchemaAddLinksDialog
  }
};
</script>

<style scoped>
p {
  padding-top: 1.4em;
}
.v-btn {
  margin: 0;
}
.v-card {
  width: 100%;
  padding: 0;
}
.v-dialog > .v-card > .v-card__title {
  color: white;
  background-color: #27aae1;
  font-size: 20px;
}
</style>
