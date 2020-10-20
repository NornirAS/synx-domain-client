<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Search Domain
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Cycle
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">
        Contact Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">
        Confirm
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <slot name="search"></slot>

        <v-btn color="primary" @click="e1 = 2" dark>
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <slot name="cicle"></slot>

        <v-btn color="primary" @click="e1 = 3" dark>
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <slot name="form"></slot>

        <v-btn color="primary" @click="e1 = 4" dark>
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <slot name="confirm"></slot>

        <v-btn color="primary" @click="e1 = 1" dark>
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      e1: 1
    };
  }
};
</script>

<style>
.theme--light.v-stepper .v-stepper__step__step {
  color: white;
  background-color: #71b663;
}
.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
  text-shadow: 0px 0px 0px #58595b !important;
}
</style>
