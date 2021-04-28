<template>
  <image-response-template>
    <div slot="title">Going Morphic</div>
    <div slot="description" class="text-justify">
      Morphic Service is a new concept where online services are part of a
      neural linking topology. Creating a Morphic service is a no code process
      and you don’t need to deploy anything to a web server or dealing with
      programmable interfaces (API). Morphic service uses an upgraded event
      driven TCP/IP network stack that is made available to you when you setup
      the Cioty domain. The new network architecture provides you access to a
      basic operating system (Synx BIOS) by issuing commands to the network from
      a terminal window or an application/script. To understand Morphic
      Architecture Design we have made it simpler for you. Using this Cioty
      domain tool you can easily setup and configure your Morphic services and
      corresponding ghosts using a graphical interface.
    </div>
    <v-btn slot="action" :to="{ name: 'serviceCreate' }" color="primary">
      Create Service
    </v-btn>
    <v-img
      slot="image"
      alt="emptyBox"
      contain
      src="../../assets/empty-box.webp"
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
