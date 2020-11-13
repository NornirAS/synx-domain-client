<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <FormHeader :title="title" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="name"
          @blur="addServiceName"
          :label="title"
          :disabled="isUpdatePage"
          dense
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormHeader from "../FormHeader.vue";
export default {
  data() {
    return {
      title: "Service Name",
      description: "Typically what the service/object do.",
      name: ""
    };
  },
  mounted() {
    this.name = this.serviceName;
  },
  methods: {
    addServiceName() {
      this.$store.commit("serviceModule/addServiceName", this.name);
    }
  },
  computed: {
    serviceModule() {
      return this.$store.state.serviceModule;
    },
    serviceName() {
      return this.serviceModule.serviceForm.serviceName;
    },
    isUpdatePage() {
      return this.$store.getters["sidebarsModule/isUpdatePage"];
    }
  },
  components: {
    FormHeader
  }
};
</script>
