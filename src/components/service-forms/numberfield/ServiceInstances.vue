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
          v-model.number="instancesToAdd"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-btn
          @click="addInstances"
          :color="colorBlue"
          :disabled="instancesLimitReached"
          :dark="!instancesLimitReached"
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
      helper: "Available Instances",
      instancesToAdd: 0,
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
      this.$store.commit("serviceModule/addInstance", this.instancesToAdd);
      this.instancesToAdd = 0;
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    instances() {
      return this.serviceModule.serviceForm.instances;
    },
    totalInstances() {
      return this.serviceModule.totalInstances;
    },
    availableInstances() {
      return this.$store.getters["serviceModule/availableInstances"];
    },
    instancesLimitReached() {
      return this.$store.getters["serviceModule/instancesLimitReached"];
    }
  },
  components: {
    DisplayCurrentValue,
    FormHeader
  }
};
</script>
