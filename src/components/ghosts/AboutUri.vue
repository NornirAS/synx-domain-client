<template>
  <div>
    <div class="title">About URIs</div>
    <div class="body-1">
      The URI for ghost consist of domain name, service name and ghostID. Here's
      an example:
    </div>
    <div class="body-1 font-weight-bold">
      domain{{ rootDomain }}service##ghostID
    </div>
  </div>
</template>

<script>
import { rootDomain } from "../../core/config";
export default {
  data() {
    return {
      rootDomain
    };
  }
};
</script>
