<template>
  <div>
    <div class="title">Other Actions</div>
    <div>
      <kill-session
        :token="token"
        :ghost="selectedGhost"
        :ghostURI="ghostURI"
      ></kill-session>
    </div>
    <div>
      <transfer-ownership
        :token="token"
        :ghost="selectedGhost"
        :ghostURI="ghostURI"
      ></transfer-ownership>
    </div>
    <div>
      <remove-ghost
        :token="token"
        :ghost="selectedGhost"
        :ghostURI="ghostURI"
      ></remove-ghost>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import KillSession from "../ghost-details/KillSession";
import TransferOwnership from "../ghost-details/TransferOwnership";
import RemoveGhost from "../ghost-details/RemoveGhost";
export default {
  computed: {
    ...mapState("authentication", ["token", "username"]),
    ...mapState("ghostDetails", ["selectedGhost"]),
    ...mapGetters("ghostDetails", ["ghostURI"])
  },
  components: {
    KillSession,
    TransferOwnership,
    RemoveGhost
  }
};
</script>

<style scoped>
/* .v-list-item__subtitle {
  white-space: break-spaces;
} */
</style>
