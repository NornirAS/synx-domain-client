<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form @submit="submitForm">
              <v-text-field
                v-model="userData.username"
                label="Username*"
                required
              ></v-text-field>
              <v-text-field
                v-model="userData.password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
              <v-btn @click="dialog = false" :color="colorBlue" text>
                Go back
              </v-btn>
              <v-btn
                @click="dialog = false"
                :color="colorBlue"
                style="float: right"
                type="submit"
                rounded
                dark
              >
                Login
              </v-btn>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: "",
        password: ""
      },
      dialog: false,
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.$socket.emit("auth", this.userData);
    }
  }
};
</script>

<style scoped>
.v-card {
  margin: 0;
}
</style>
