<template>
  <v-card v-if="!noDomains">
    <v-data-table
      @page-count="pageCount = $event"
      :headers="headers"
      :items="domains"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:[`item.domain`]="{ item }">
        <div class="body-1">
          <span class="font-weight-bold">{{ item.name }}</span
          >{{ rootDomain }}
        </div>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <delete-domain
          :token="token"
          :username="username"
          :domain="item.name"
        ></delete-domain>
      </template>
      <template v-slot:[`item.activation`]="{ item }">
        <div align="end">
          <v-btn
            v-if="!item.active"
            @click="toActivateDomain(item.name)"
            color="primary"
            class="text-capitalize ma-0"
            rounded
            x-small
          >
            Activate
          </v-btn>
          <v-chip v-else color="accent" x-small>
            Active
          </v-chip>
        </div>
      </template>
    </v-data-table>
    <v-pagination
      v-if="!noDomains && !domainsLengthLessItemsPerPage"
      v-model="page"
      :length="pageCount"
      light
    ></v-pagination>
  </v-card>
</template>

<script>
import { rootDomain } from "../../core/config";
import { mapState, mapGetters, mapMutations } from "vuex";
import DeleteDomain from "./DeleteDomain";
export default {
  data() {
    return {
      rootDomain,
      page: 1,
      pageCount: 0,
      itemsPerPage: 25,
      headers: [
        {
          text: "Domain",
          value: "domain",
          sortable: false
        },
        {
          value: "delete",
          sortable: false
        },
        {
          text: "Status",
          value: "activation",
          align: "end",
          sortable: false
        }
      ]
    };
  },
  methods: {
    ...mapMutations("stripeModule", ["addDomain"]),
    toActivateDomain(domain) {
      this.addDomain(domain);
      this.$router.push({ name: "activate-domain" });
    }
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    ...mapState("domainsModule", ["domains"]),
    ...mapGetters("domainsModule", ["noDomains"]),
    domainsLengthLessItemsPerPage() {
      return this.domains.length <= this.itemsPerPage;
    }
  },
  components: {
    DeleteDomain
  }
};
</script>
