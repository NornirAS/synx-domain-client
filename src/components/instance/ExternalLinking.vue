<template>
  <v-switch
    class="float-right"
    v-model="switch1"
    :label="switch1 === true ? 'Yes' : 'No'"
  ></v-switch>
</template>

<script>
export default {
  data() {
    return {
      switch1: true
    };
  }
};
</script>
