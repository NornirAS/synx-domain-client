<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row justify="start" align="center">
      <v-col sm="3">
        <display-current-value>
          <div slot="currentValue" :style="divHeight">
            <span :style="primaryStyle">{{ availableInstances }}</span>
            <span :style="secondaryStyle">/</span>
            <span :style="secondaryStyle">{{ totalInstances }}</span>
          </div>
          <p slot="helper" :style="helperStyle">{{ helper }}</p>
        </display-current-value>
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
          :max="availableInstances"
          v-model.number="serviceInstances"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-btn
          @click="addInstances"
          :color="colorBlue"
          :disabled="isExceedsLimit"
          :dark="!isExceedsLimit"
          rounded
          medium
        >
          Add
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DisplayCurrentValue from "../../DisplayCurrentValue.vue";
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Instances",
      description: "Some description for instances.",
      totalInstances: 1000,
      helper: "Available Instances",
      serviceInstances: 0,
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
      helperStyle: {
        margin: "0",
        color: "#58595b",
        fontSize: "14px"
      },
      divHeight: {
        height: "45px"
      }
    };
  },
  methods: {
    addInstances() {
      this.$store.state.serviceForm.instances += this.serviceInstances;
      this.serviceInstances = 0;
    },
    removeInstances() {
      this.$store.state.serviceForm.instances -= this.serviceInstances;
      this.serviceInstances = 0;
    }
  },
  computed: {
    instances() {
      return this.$store.state.serviceForm.instances;
    },
    availableInstances() {
      return this.totalInstances - this.instances;
    },
    isExceedsLimit() {
      return this.availableInstances < this.serviceInstances ||
        this.availableInstances <= 0
        ? true
        : false;
    }
  },
  components: {
    DisplayCurrentValue,
    FormHeader
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
