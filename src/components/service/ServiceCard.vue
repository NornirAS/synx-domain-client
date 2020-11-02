<template>
  <v-card outlined>
    <v-row align="center">
      <v-col cols="2" sm="1">
        <v-checkbox
          :style="checkBoxStyle"
          :value="isSelected"
          @change="selectService(index)"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="10" sm="8">
        <ServiceHeader
          :title="title"
          :description="micropage"
          :url="url"
          :href="url"
          :icon="mdiCircleEditOutline"
          :index="index"
        />
      </v-col>
      <v-col col="12" sm="3" align="right">
        <display-current-value>
          <div slot="currentValue" :style="divHeight">
            <span :style="primaryStyle">{{ availableInstances }}</span>
            <span :style="secondaryStyle">/</span>
            <span :style="secondaryStyle">{{ totalInstances }}</span>
          </div>
          <p slot="helper" :style="helperStyle">{{ helper }}</p>
        </display-current-value>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiCircleEditOutline } from "@mdi/js";
import ServiceHeader from "./ServiceHeader.vue";
import DisplayCurrentValue from "../DisplayCurrentValue.vue";
export default {
  props: ["title", "availableInstances", "totalInstances", "index", "url"],
  data() {
    return {
      mdiCircleEditOutline,
      micropage: "Micropage: ",
      helper: "Available Instances",
      primaryStyle: {
        color: "#27aae1",
        fontSize: "26px",
        fontWeight: "500"
      },
      secondaryStyle: {
        color: "#58595b",
        fontSize: "16px",
        fontWeight: "500"
      },
      helperStyle: {
        margin: "0",
        color: "#58595b",
        fontSize: "14px"
      },
      divHeight: {
        height: "30px"
      },
      checkBoxStyle: {
        margin: "0"
      }
    };
  },
  methods: {
    selectService(index) {
      this.$store.commit("servicesModule/selectService", index);
    }
  },
  computed: {
    isSelected() {
      const service = this.$store.state.servicesModule.services[this.index];
      return service.isSelected === true;
    }
  },
  components: {
    ServiceHeader,
    DisplayCurrentValue
  }
};
</script>
