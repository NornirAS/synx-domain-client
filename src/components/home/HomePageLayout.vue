<template>
  <div class="align-center justify-center">
    <div class="headline" align="center">
      <slot name="title"></slot>
    </div>
    <div class="body-1 my-4" align="center">
      <slot name="description"></slot>
    </div>
    <div class="my-6" align="center">
      <slot name="form"></slot>
    </div>
    <div class="body-1" align="center">
      <slot name="helper"></slot>
    </div>
  </div>
</template>
