<template>
  <v-form ref="form" v-model="valid" @submit="submitForm" lazy-validation>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="authData.username"
            :rules="[v => !!v || 'Username is required']"
            label="Synx ID"
            dark
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="authData.password"
            :rules="[v => !!v || 'Password is required']"
            type="password"
            label="Password"
            dark
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <p align="center">{{ error }}</p>
        </v-col>
      </v-row>
      <br />
      <br />
      <br />
      <br />
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
    submitForm(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        localStorage.setItem("username", this.authData.username);
        this.$socket.emit("authenticate", this.authData);
        this.$refs.form.reset();
      }
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.authModule.idToken;
    },
    authError() {
      return this.$store.state.authModule.authError;
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
