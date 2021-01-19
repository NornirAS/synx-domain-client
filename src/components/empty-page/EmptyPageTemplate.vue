<template>
  <div>
    <div align="center" class="title">
      <slot name="title"></slot>
    </div>
    <div align="center" class="body-1">
      <slot name="description" align="center"></slot>
    </div>
    <div align="center">
      <slot name="action" align="center"></slot>
    </div>
    <div align="center">
      <slot name="image" align="center"></slot>
    </div>
  </div>
</template>

<style>
.title {
  color: var(--v-secondary-base);
}
.body-1 {
  color: var(--v-secondary-base);
}
</style>
