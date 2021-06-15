<template>
  <div>
    <div class="title">CURL to receive data</div>
    <v-row>
      <v-col class="shrink">
        <copy-content :content="curlReceive"></copy-content>
      </v-col>
      <v-col class="grow">
        <v-text-field
          v-model="curlReceive"
          dense
          outlined
          hide-details
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="title">CURL to send data</div>
    <v-row>
      <v-col class="shrink">
        <copy-content :content="curlSend"></copy-content>
      </v-col>
      <v-col class="grow">
        <v-text-field
          v-model="curlSend"
          dense
          outlined
          hide-details
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CopyContent from "./CopyContent";
export default {
  props: ["curlReceive", "curlSend"],
  components: {
    CopyContent
  }
};
</script>
