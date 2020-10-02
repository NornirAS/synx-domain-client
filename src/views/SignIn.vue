<template>
  <v-row style="height: 100%" justify="center" align="center">
    <v-col md="4">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form @submit="submitForm">
              <v-text-field
                v-model="authData.username"
                label="Username*"
                required
              ></v-text-field>
              <v-text-field
                v-model="authData.password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
              <v-btn :color="colorBlue" text>
                Go back
              </v-btn>
              <v-btn
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
          <ul v-if="errors.length">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
          <small>*indicates required field</small>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      authData: {
        username: "",
        password: ""
      },
      colorBlue: "#27AAE1"
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      // this.errors = [];
      // if (!this.username) {
      //   this.errors.push("Username must be provided");
      // }
      // if (!this.password) {
      //   this.errors.push("password must be provided");
      // }
      // if (this.username.length < 5) {
      //   this.errors.push("Username require minimum 6 characters");
      // }
      // if (this.password.length < 8) {
      //   this.errors.push("Password require minimum 8 characters");
      // }
      this.$store.dispatch("signin", this.authData);
    }
  }
};
</script>

<style scoped>
.v-card {
  margin: 0;
}
</style>
