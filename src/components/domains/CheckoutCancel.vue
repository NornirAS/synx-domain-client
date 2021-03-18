<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$socket.emit("delete_domain", {
      token: this.token,
      username: this.username,
      domain: this.domain,
      feature: "remove"
    });
    this.dialog = false;
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    ...mapState("alarmModule", ["deleteDomainSuccess"]),
    domain() {
      return this.$route.params.domainName;
    }
  },
  watch: {
    deleteDomainSuccess() {
      this.$router.push({ name: "domains" });
    }
  }
};
</script>
