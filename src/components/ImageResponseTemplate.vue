<template>
  <div class="image-response-template d-flex align-center justify-center">
    <div>
      <div align="center" class="title mb-2">
        <slot name="title"></slot>
      </div>
      <div align="center" class="body-1 mb-4">
        <slot name="description"></slot>
      </div>
      <div align="center" class="mb-4">
        <slot name="action"></slot>
      </div>
      <div align="center">
        <slot name="image"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-response-template {
  height: 100%;
}
</style>
