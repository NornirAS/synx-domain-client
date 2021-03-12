<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="submitForm"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :rules="[v => !!v || 'Username is required']"
      placeholder=" "
      type="email"
      name="email"
      label="Synx ID (email)"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="[v => !!v || 'Password is required']"
      placeholder=" "
      type="password"
      name="password"
      label="Password"
      required
    ></v-text-field>
    <div class="body-1 font-italic mt-4" align="center">* Required fields</div>
    <v-expand-transition>
      <div v-show="expand" class="body-1" align="center">{{ error }}</div>
    </v-expand-transition>
    <v-btn class="text-capitalize mt-8" type="submit" rounded outlined dark>
      Sign In
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      expand: false,
      error: "",
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations("authModule", ["resetError"]),
    ...mapActions("authModule", ["addUsername"]),
    submitForm() {
      this.$socket.emit("authenticate", {
        username: this.username,
        password: this.password
      });
    }
  },
  computed: {
    ...mapState("authModule", ["authError"]),
    ...mapGetters("authModule", ["isAuthenticated"])
  },
  watch: {
    isAuthenticated() {
      this.addUsername(this.username);
      this.resetError();
      this.$router.push({ name: "domains" });
    },
    username() {
      this.resetError();
    },
    password() {
      this.resetError();
    },
    authError(newValue) {
      this.error = newValue;
    },
    error() {
      this.expand = !this.expand;
    }
  }
};
</script>

<style scoped>
.v-text-field .v-label--active .theme--dark {
  font-style: italic;
  padding-left: 0.5em;
  padding-right: 0.1em;
}
</style>
