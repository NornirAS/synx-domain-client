<template>
  <v-expansion-panels slot="action" class="mt-4 mb-6" accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:actions>
          <v-icon color="primary" class="icon">$expand</v-icon>
        </template>
        Schema Elements
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <element-description
          v-for="(element, index) in elements"
          :key="index"
          :element="element"
          :index="index"
        ></element-description>
        <element-description></element-description>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from "vuex";
import ElementDescription from "./ElementDescription";
export default {
  computed: {
    ...mapState("micropageForm", ["schemaOverview"]),
    elements() {
      return this.schemaOverview.elements;
    }
  },
  components: {
    ElementDescription
  }
};
</script>

<style scoped>
.v-expansion-panels {
  border-left: 5px solid var(--v-primary-base);
}
</style>
