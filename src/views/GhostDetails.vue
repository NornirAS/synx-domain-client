<template>
  <div>
    <ghost-details></ghost-details>
    <ghost-status></ghost-status>
    <remove-ghost></remove-ghost>
  </div>
</template>

<script>
import GhostDetails from "../components/ghost-details/GhostDetails";
import GhostStatus from "../components/ghost-details/ghost-status/GhostStatus";
import RemoveGhost from "../components/ghost-details/RemoveGhost";
export default {
  components: {
    GhostDetails,
    GhostStatus,
    RemoveGhost
  }
};
</script>
