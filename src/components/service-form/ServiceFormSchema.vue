<template>
  <input-card>
    <div slot="title">Service Schema</div>
    <div slot="subtitle">
      This is the message format or API for this service. Put Schema on a single
      line to make it easier to parse on the client. You may link to variables
      in other services by using @domain/servicename#variable@ notation. Include
      links in link section below.
    </div>
    <v-combobox
      v-model="tagName"
      :rules="tagNameRules"
      :counter="32"
      name="tag-name"
      label="Add elements"
      type="text"
      error-count="2"
      slot="action"
      multiple
      chips
    >
      <template v-slot:selection="data">
        <v-chip
          :key="data.index"
          v-bind="data.attrs"
          @click:close="remove(data.index)"
          close
        >
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>
    <v-card-actions slot="table">
      <v-simple-table v-if="serviceSchema.length !== 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Element</th>
              <th class="text-center">Links</th>
              <th class="text-center">Add Link</th>
              <th class="text-right">Remove Element</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in serviceSchema" :key="index">
              <td>{{ item.tagName }}</td>
              <td>
                <ViewLinksDialog :elementIndex="index" />
              </td>
              <td>
                <AddLinksDialog :elementIndex="index" />
              </td>
              <td class="text-right">
                <v-btn @click="remove(index)" :color="colorRed" icon x-small>
                  <v-icon>{{ mdiDelete }}</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-actions>
  </input-card>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import AddLinksDialog from "./ServiceFormSchemaAddLinksDialog";
import ViewLinksDialog from "./ServiceFormSchemaViewLinksDialog";
import InputCard from "../FormInputCard";
export default {
  data() {
    return {
      mdiDelete,
      tagName: "",
      mounted: false,
      linkTo: {},
      tagNameRules: [
        v => (v && v.length) >= 1 || "Element is required",
        v => (v && v.length) <= 32 || "You can add maximum 32 elements"
      ],
      colorRed: "#FF6666"
    };
  },
  mounted() {
    if (this.isEditPage) {
      this.mounted = true;
      this.tagName = this.serviceSchema.map(obj => obj.tagName);
    }
  },
  methods: {
    remove(index) {
      this.tagName.splice(index, 1);
      this.$store.commit(
        "serviceFormModule/removeSelectedServiceSchema",
        index
      );
    }
  },
  computed: {
    serviceSchema() {
      return this.$store.state.serviceFormModule.serviceSchema;
    },
    isEditPage() {
      return this.$route.params.index >= 0;
    }
  },
  watch: {
    tagName(newValue, oldValue) {
      if (newValue.length > oldValue.length && !this.mounted) {
        const newAdded = newValue.slice(-1);
        const tagName = newAdded[0];
        const links = [];
        this.$store.commit("serviceFormModule/addServiceSchema", {
          tagName,
          links
        });
      } else if (newValue.length > oldValue.length && this.mounted) {
        this.mounted = false;
      } else if (newValue.length < oldValue.length) {
        this.$store.commit("serviceFormModule/removeLastServiceSchema");
      }
    }
  },
  components: {
    AddLinksDialog,
    ViewLinksDialog,
    InputCard
  }
};
</script>

<style scoped>
.v-data-table {
  width: 100%;
}
</style>
