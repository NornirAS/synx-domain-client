<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <v-container fluid>
      <Services></Services>
    </v-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Services from "../components/Services.vue";
export default {
  components: {
    Header,
    Sidebar,
    Services
  }
};
</script>
