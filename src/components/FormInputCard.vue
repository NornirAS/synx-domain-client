<template>
  <v-card>
    <v-card-title class="body-1">
      <slot name="title"></slot>
      <v-icon
        @mouseover="expand = true"
        @mouseleave="expand = false"
        color="primary"
      >
        {{ mdiInformationOutline }}
      </v-icon>
    </v-card-title>
    <v-expand-transition>
      <v-card-subtitle v-show="expand">
        <slot name="subtitle"></slot>
      </v-card-subtitle>
    </v-expand-transition>
    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
    <slot name="table"></slot>
  </v-card>
</template>

<script>
import { mdiInformationOutline } from "@mdi/js";
export default {
  data() {
    return {
      expand: false,
      mdiInformationOutline
    };
  }
};
</script>

<style scoped>
.v-card__title,
.v-card__actions {
  margin-top: 1em;
  padding: 0;
}
.v-card,
.v-card__subtitle {
  padding: 0;
  margin: 0;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>
