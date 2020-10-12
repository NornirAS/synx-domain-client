<template>
  <v-row>
    <!-- <Checkbox :style="checkBoxStyle" :event="check" /> -->
    <v-checkbox :style="checkBoxStyle" @change="check(index)"></v-checkbox>
    <v-card outlined>
      <v-row>
        <!-- <v-col md="3">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Favicon_250x250.png"
          ></v-img>
        </v-col> -->
        <v-col md="6">
          <FormHeader
            :title="title"
            :description="micropage"
            :url="url"
            :href="url"
          />
        </v-col>
        <v-col md="6" align="right">
          <CurrentValue
            :primaryValue="availableInstances"
            :secondaryValue="limitInstances"
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
import FormHeader from "../service-forms/FormHeader.vue";
import CurrentValue from "../service-forms/numberfield/CurrentValue.vue";
export default {
  props: ["title", "availableInstances", "limitInstances", "index", "url"],
  data() {
    return {
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
      divHeight: {
        height: "30px"
      },
      checkBoxStyle: {
        margin: "0",
        paddingTop: "1em"
      }
    };
  },
  methods: {
    check(index) {
      this.$store.dispatch("selectService", index);
    }
  },
  components: {
    FormHeader,
    CurrentValue
  }
};
</script>
