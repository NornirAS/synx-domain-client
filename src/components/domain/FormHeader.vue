<template>
  <v-card outlined>
    <v-breadcrumbs :items="formSteps">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :style="breadcrumbsItemStyle"
          :disabled="item.disabled"
        >
          <v-icon :class="{ active: !item.disabled }">{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>

<script>
import {
  mdiChevronRight,
  mdiNumeric1CircleOutline,
  mdiNumeric2CircleOutline,
  mdiNumeric3CircleOutline,
  mdiNumeric4CircleOutline
} from "@mdi/js";
export default {
  data() {
    return {
      mdiChevronRight,
      formSteps: [
        {
          text: "Search Domain",
          disabled: false,
          icon: mdiNumeric1CircleOutline
        },
        {
          text: "Cycle",
          disabled: true,
          icon: mdiNumeric2CircleOutline
        },
        {
          text: "Contact Details",
          disabled: true,
          icon: mdiNumeric3CircleOutline
        },
        {
          text: "Confirm",
          disabled: true,
          icon: mdiNumeric4CircleOutline
        }
      ],
      breadcrumbsItemStyle: {
        color: "#58595B",
        fontSize: "16px"
      }
    };
  }
};
</script>

<style scoped>
.v-card {
  padding: 0 2em;
}
.v-breadcrumbs {
  justify-content: space-between;
}
.active {
  color: #58b957;
}
</style>
