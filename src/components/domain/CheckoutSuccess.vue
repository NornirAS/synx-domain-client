<template>
  <image-response-template>
    <div slot="title">
      Congratulations! You are now the owner of {{ domain }}{{ rootDomain }}
    </div>
    <div slot="action">
      <v-btn
        @click="toDomains"
        color="info"
        class="text-capitalize align-center"
        rounded
        dark
      >
        Back to your domains
      </v-btn>
    </div>
    <div slot="image">
      <v-img
        alt="connectedWorld"
        contain
        src="../../assets/celebration.webp"
        transition="scale-transition"
        height="300px"
      >
      </v-img>
    </div>
  </image-response-template>
</template>

<script>
import { rootDomain } from "../../core/config";
import { mapState } from "vuex";
import ImageResponseTemplate from "../ImageResponseTemplate";
export default {
  data() {
    return {
      rootDomain
    };
  },
  methods: {
    toDomains() {
      this.getAllDomains();
      this.$router.push({ name: "domains" });
    },
    getAllDomains() {
      this.$socket.emit("get_all_domains", {
        token: this.token,
        username: this.username
      });
    }
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    domain() {
      return this.$route.params.domainName;
    }
  },
  components: {
    ImageResponseTemplate
  }
};
</script>
