<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="text-capitalize"
        color="primary"
        small
      >
        <v-icon v-if="hasMapId">{{ mdiPencil }}</v-icon>
        <v-icon v-else>{{ mdiPlus }}</v-icon>
      </v-btn>
    </template>

    <dialog-card>
      <div slot="title">Add Map ID</div>
      <div slot="body">
        <div class="body-1">Generate map ID?</div>
        <v-form
          id="map-id"
          ref="mapId"
          v-model="valid"
          @submit.prevent="submitForm"
          lazy-validation
        >
          <v-switch
            v-model="generate"
            :label="generate === true ? 'Yes' : 'No'"
            inset
          ></v-switch>
          <v-text-field
            v-if="generate === false"
            v-model="mapId"
            :rules="mapIdRules"
            label="Custom map ID"
            type="text"
            outlined
            dense
          ></v-text-field>
        </v-form>
      </div>
      <div slot="action">
        <v-btn
          @click="dialog = false"
          class="text-capitalize"
          color="primary"
          text
          small
          >Cancel</v-btn
        >
        <v-btn
          class="text-capitalize"
          color="info"
          type="submit"
          form="map-id"
          rounded
          small
          >Confirm
        </v-btn>
      </div>
    </dialog-card>
  </v-dialog>
</template>

<script>
import { mdiPlus, mdiPencil } from "@mdi/js";
import DialogCard from "../globals/DialogCard";
export default {
  props: ["token", "ghost"],
  data() {
    return {
      mdiPlus,
      mdiPencil,
      dialog: false,
      generate: false,
      valid: false,
      mapId: "",
      mapIdRules: [
        v => (!!v && this.generate === false) || "Map ID is required",
        v => (v && v.length) <= 64 || "Map ID must be maximum 64 character",
        v => /[A-Za-z0-9-_]/.test(v) || "Should contain only A-z 0-9 - and _"
      ]
    };
  },
  mounted() {
    if (this.hasMapId) {
      this.mapId = this.ghost.mapID;
    }
  },
  methods: {
    submitForm() {
      const isFormValid = this.$refs.mapId.validate();
      if (isFormValid) {
        this.$socket.emit("add_mapId", {
          domain: this.ghost.domain,
          service: this.ghost.service,
          token: this.token,
          instance: this.ghost.instance,
          mapId: this.mapId,
          generate: this.generate
        });
        this.dialog = false;
      }
    }
  },
  computed: {
    hasMapId() {
      return this.ghost.mapID !== null;
    }
  },
  components: {
    DialogCard
  }
};
</script>
