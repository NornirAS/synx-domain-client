<template>
  <image-response-template>
    <div slot="title">Welcome to Cioty!</div>
    <div slot="description" class="text-justify">
      Cioty has been built on the Synx Hive platform provided by company Nornir.
      Synx Hive is a machine collective serverless network system where IoE/IoT
      objects become dynamical resources that can be connected to various
      services online and get intelligence from them. To create your first
      IoE/IoT service (Morphic Service) you will need to set up a domain name on
      Cioty.com. Once you have set up your domain you can create several Morphic
      services for that domain.
    </div>
    <v-btn slot="action" :to="{ name: 'create-domain' }" color="primary">
      Create your first domain
    </v-btn>
    <v-img
      slot="image"
      alt="connectedWorld"
      contain
      src="../../assets/connected-world.webp"
      transition="scale-transition"
      height="300px"
    >
    </v-img>
  </image-response-template>
</template>

<script>
import ImageResponseTemplate from "../globals/ImageResponseTemplate";
export default {
  components: {
    ImageResponseTemplate
  }
};
</script>
