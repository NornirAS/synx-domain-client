<template>
  <image-response-template>
    <div slot="title">Ghost</div>
    <div slot="description" class="text-justify">
      When you create an Morphic Service (IoE) you need to understand the
      concept of network ghosts. Ghost is a kind of undefined entity in the
      network that represents your IoE object. An IoE object is something that
      is physical and is connected to the network against his ghost. This can be
      a client application, web browser, sensor, server application, database,
      fax machine, monitor, door bell, coffee machine or anything else that
      requires sending or receiving data when needed. Ghost entities start to
      exist once an IoE makes a connection against a Morphic service. Then the
      behaviour of the service is inherited by the IoE object. When the IoT
      object disconnects from the Morphic service the ghost entity disappears.
    </div>
    <v-btn slot="action" :to="{ name: 'serviceCreate' }" color="primary">
      Create Service
    </v-btn>
    <v-img
      slot="image"
      alt="productTeardown"
      contain
      src="../../assets/product-teardown.webp"
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
