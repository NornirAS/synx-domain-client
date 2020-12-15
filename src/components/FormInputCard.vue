<template>
  <v-card>
    <v-card-title>
      <slot name="title"></slot>
      <v-icon @mouseover="expand = true" @mouseleave="expand = false">
        {{ mdiInformation }}
      </v-icon>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="expand">
        <slot name="subtitle"></slot>
      </v-card-text>
    </v-expand-transition>
    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
    <slot name="table"></slot>
  </v-card>
</template>

<script>
import { mdiInformation } from "@mdi/js";
export default {
  data() {
    return {
      expand: false,
      mdiInformation
    };
  }
};
</script>

<style scoped>
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding-bottom: 0;
}
</style>
