<template>
  <div>
    <ghost-details></ghost-details>
    <ghost-status></ghost-status>
    <remove-ghost></remove-ghost>
  </div>
</template>

<script>
import GhostDetails from "../components/ghost-overview/ghost-details/GhostDetails";
import GhostStatus from "../components/ghost-overview/ghost-status/GhostStatus";
import RemoveGhost from "../components/ghost-overview/RemoveGhost";
export default {
  components: {
    GhostDetails,
    GhostStatus,
    RemoveGhost
  }
};
</script>
