<template>
  <v-expansion-panels slot="action" accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:actions>
          <v-icon color="primary" class="icon">$expand</v-icon>
        </template>
        Schema Details
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <add-element class="pb-6"></add-element>
        <element-description
          v-for="(element, index) in elements"
          :key="index"
          :element="element"
          :index="index"
        ></element-description>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from "vuex";
import ElementDescription from "./ElementDescription";
import AddElement from "./AddElement";
export default {
  computed: {
    ...mapState("micropageForm", ["schemaOverview"]),
    elements() {
      return this.schemaOverview.elements;
    }
  },
  components: {
    ElementDescription,
    AddElement
  }
};
</script>

<style scoped>
.v-expansion-panels {
  border-left: 5px solid var(--v-primary-base);
}
</style>
