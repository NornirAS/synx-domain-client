<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="colorLightGrey"
        :disabled="instancesLimitReached"
        :dark="!instancesLimitReached"
        :rounded="!instancesLimitReached"
        :text="instancesLimitReached"
        class="text-capitalize"
        v-bind="attrs"
        v-on="on"
        x-small
      >
        {{ instanceBtnLabel }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Add instances
      </v-card-title>
      <v-card-subtitle>
        You can add {{ availableInstances }} instances.
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model.number="instancesToAdd"
          :rules="instancesRules"
          ref="validateInstances"
          type="number"
          error-count="2"
          slot="action"
          required
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      <v-card-actions :style="cardActionStyle">
        <v-btn
          @click="dialog = false"
          :color="colorLightGrey"
          small
          rounded
          dark
        >
          Cances
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="addInstances"
          :color="colorBlue"
          :disabled="cannotAddMoreInstances"
          small
          rounded
          dark
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["domain", "service", "availableInstances"],
  data() {
    return {
      valid: false,
      dialog: false,
      instancesToAdd: "",
      cardActionStyle: {
        padding: "0 24px 20px"
      },
      colorBlue: "#27AAE1",
      colorLightGrey: "#404B5F",
      instancesRules: [
        v => !!v || "Required",
        v => v > 0 || "You should Add at least one instance",
        v => v <= this.availableInstances || "You can't add more instances",
        v => /^[\d]+$/.test(v) || "Only numbers are allowed"
      ]
    };
  },
  methods: {
    addInstances() {
      this.$refs.validateInstances.validate();
      if (this.$refs.validateInstances.validate()) {
        this.$socket.emit(
          "add_instances",
          this.domain,
          this.service,
          this.token,
          this.instancesToAdd
        );
        this.dialog = false;
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    instancesLimitReached() {
      return this.availableInstances === 0 ? true : false;
    },
    cannotAddMoreInstances() {
      return this.availableInstances - this.instancesToAdd < 0 ? true : false;
    },
    successMessage() {
      return this.$store.state.alarmModule.successMessage;
    },
    instanceBtnLabel() {
      return this.instancesLimitReached ? "Limit is reached" : "Add instances";
    }
  },
  watch: {
    successMessage() {
      this.$socket.emit("get_all_services", this.domain, this.token);
    }
  }
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__text {
  padding-bottom: 0;
}
.v-btn {
  margin: 0.3em 1em 0.3em 0;
}
</style>
