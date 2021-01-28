<template>
  <div align="center">
    <div class="empty-page-content">
      <div align="center" class="title">
        <slot name="title"></slot>
      </div>
      <br />
      <div align="center" class="body-1">
        <slot name="description" align="center"></slot>
      </div>
      <br />
      <div align="center">
        <slot name="action" align="center"></slot>
      </div>
    </div>
    <div align="center">
      <slot name="image" align="center"></slot>
    </div>
  </div>
</template>

<style scoped>
.empty-page-content {
  width: 50%;
}
.title {
  color: var(--v-secondary-base);
}
.body-1 {
  color: var(--v-secondary-base);
}
</style>
