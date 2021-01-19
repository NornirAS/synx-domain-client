<template>
  <div>
    <div align="center" class="title">
      <slot name="title">Hui</slot>
    </div>
    <div align="center" class="body-1">
      <slot name="description" align="center">Description</slot>
    </div>
    <div align="center">
      <slot name="action" align="center">Action</slot>
    </div>
    <div align="center">
      <slot name="image" align="center">Picture</slot>
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
