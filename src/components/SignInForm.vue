<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="submitForm"
    lazy-validation
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-text-field
            v-model="authData.username"
            :rules="[v => !!v || 'Username is required']"
            type="email"
            name="email"
            label="Synx ID (email)"
            dark
            required
          ></v-text-field>
          <v-text-field
            v-model="authData.password"
            :rules="[v => !!v || 'Password is required']"
            type="password"
            name="password"
            label="Password"
            dark
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <p :color="colorWhite" align="center">{{ error }}</p>
        </v-col>
      </v-row>
      <br v-if="!isMobile" />
      <br v-if="!isMobile" />
      <v-row justify="center">
        <v-col cols="12" md="4" align="center">
          <v-btn :color="colorWhite" type="submit" rounded outlined dark>
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      error: "",
      authData: {
        username: "",
        password: ""
      },
      colorWhite: "#FFFFFF"
    };
  },
  methods: {
    submitForm() {
      localStorage.setItem("username", this.authData.username);
      this.$socket.emit("authenticate", this.authData);
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.authModule.idToken;
    },
    authError() {
      return this.$store.state.authModule.authError;
    },
    isMobile() {
      return this.$store.state.isMobile;
    }
  },
  watch: {
    isAuth() {
      this.$store.commit("authModule/resetError");
      this.$router.push({ name: "domains" });
    },
    authError(newValue) {
      this.error = newValue;
    }
  }
};
</script>

<style scoped>
p {
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
}
</style>
