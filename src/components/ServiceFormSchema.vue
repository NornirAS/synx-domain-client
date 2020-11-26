<template>
  <input-card>
    <div slot="title">Servie Schema</div>
    <div slot="subtitle">
      This is the message format or API for this service. Put Schema on a single
      line to make it easier to parse on the client. You may link to variables
      in other services by using @domain/servicename#variable@ notation. Include
      links in link section below.
    </div>
    <v-combobox
      v-model="tagName"
      :rules="tagNameRules"
      :counter="30"
      name="tag-name"
      label="Schema"
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
    <v-simple-table v-if="serviceSchema.length !== 0" slot="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Tag Name</th>
            <th class="text-center">Link To</th>
            <th class="text-right">Remove Schema</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in serviceSchema" :key="index">
            <td>{{ item.tagName }}</td>
            <td>
              <Dialog :index="index" />
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
  </input-card>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import Dialog from "./ServiceFormSchemaDialog";
import InputCard from "./ServiceFormInputCard";
export default {
  data() {
    return {
      mdiDelete,
      tagName: "",
      mounted: false,
      linkTo: {},
      tagNameRules: [
        v => (v && v.length) >= 1 || "Keyword is required",
        v => (v && v.length) <= 30 || "You can add maximum 30 keywords"
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
        const linkTo = Object.assign({}, this.linkTo, {});
        this.$store.commit("serviceFormModule/addServiceSchema", {
          tagName,
          linkTo
        });
      } else if (newValue.length > oldValue.length && this.mounted) {
        this.mounted = false;
      } else if (newValue.length < oldValue.length) {
        this.$store.commit("serviceFormModule/removeLastServiceSchema");
      }
    }
  },
  components: {
    Dialog,
    InputCard
  }
};
</script>

<style scoped>
.v-data-table {
  width: 100%;
}
</style>
