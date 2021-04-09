<template>
  <v-app>
    <router-view name="side-bar"></router-view>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.theme--light.v-application {
  color: rgba(0, 0, 0, 0.87) !important;
  background: #ebeff4 !important;
}
.theme--dark.v-application {
  color: rgb(255, 255, 255, 0.87) !important;
  background: #000000 !important;
}
.v-main {
  height: 100vh;
}
.container.container--fluid {
  height: 100%;
  padding: 0 12px;
  overflow: scroll;
}
.v-card {
  margin-bottom: 16px;
  padding: 24px 24px 16px 24px;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  transition-delay: 3600s;
}
@media screen and (max-width: 960px) {
  .v-main {
    height: 100%;
  }
}
</style>
