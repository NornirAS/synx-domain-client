<template>
  <v-row>
    <Checkbox />
    <v-card outlined>
      <v-row>
        <v-col md="3">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Favicon_250x250.png"
          ></v-img>
        </v-col>
        <v-col md="6">
          <FormHeader
            :title="title"
            :description="micropage"
            :url="url"
            :href="url"
          />
        </v-col>
        <v-col md="3" align="right">
          <CurrentValue
            :primaryValue="primaryValue"
            :secondaryValue="secondaryValue"
            :helper="helper"
            :primaryStyle="primaryStyle"
            :secondaryStyle="secondaryStyle"
            :divHeight="divHeight"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import Checkbox from "../controls/Checkbox.vue";
import FormHeader from "../service-forms/FormHeader.vue";
import CurrentValue from "../service-forms/numberfield/CurrentValue.vue";
export default {
  data() {
    return {
      title: "Service name",
      micropage: "Micropage: ",
      url: "https://domain.cioty.com/service",
      primaryValue: "1000",
      secondaryValue: "/1000",
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
      divHeight: {
        height: "30px"
      }
    };
  },
  components: {
    Checkbox,
    FormHeader,
    CurrentValue
  }
};
</script>

<style>
.primary-value {
  font-size: 26px;
}
</style>
