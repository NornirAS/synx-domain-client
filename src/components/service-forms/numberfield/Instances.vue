<template>
  <v-card outlined>
    <FormHeader :title="title" :description="description" />
    <v-row justify="start" align="center">
      <v-col sm="3">
        <CurrentValue
          :primaryValue="availableInstances()"
          :secondaryValue="totalInstances"
          :helper="helper"
          :primaryStyle="primaryStyle"
          :secondaryStyle="secondaryStyle"
          :divHeight="divHeight"
        />
      </v-col>
      <v-col sm="2">
        <v-text-field
          :label="title"
          single-line
          dense
          outlined
          hide-details
          type="number"
          min="1"
          :max="totalInstances - instances"
          v-model.number="serviceInstances"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-btn
          @click="addInstances"
          :color="colorBlue"
          :disabled="
            availableInstances() < serviceInstances ||
              availableInstances() === 0
          "
          rounded
          medium
          :dark="availableInstances() != 0"
        >
          Add
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CurrentValue from "./CurrentValue.vue";
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Instances",
      description: "Some description fro instances.",
      totalInstances: 1000,
      helper: "Available Instances",
      serviceInstances: 0,
      disabled: false,
      colorBlue: "#27AAE1",
      primaryStyle: {
        color: "#27aae1",
        fontSize: "40px",
        fontWeight: "500"
      },
      secondaryStyle: {
        color: "#58595b",
        fontSize: "30px",
        fontWeight: "500"
      },
      divHeight: {
        height: "45px"
      }
    };
  },
  components: {
    CurrentValue,
    FormHeader
  },
  methods: {
    addInstances() {
      this.$store.state.serviceForm.instances += this.serviceInstances;
      this.serviceInstances = 0;
    },
    availableInstances() {
      return this.totalInstances - this.instances;
    }
  },
  computed: {
    instances() {
      return this.$store.state.serviceForm.instances;
    }
  }
};
</script>

<style scoped>
.col-sm-4 {
  padding: 0 12px;
}
.disabled {
  background-color: red;
}
</style>
