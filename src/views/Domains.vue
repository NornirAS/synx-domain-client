<template>
  <page-layout>
    <page-title slot="page-title">
      <div slot="title">Domains</div>
      <v-btn
        :to="{ name: 'create-domain' }"
        slot="action"
        class="text-capitalize"
        small
        rounded
        outlined
        color="primary"
      >
        Add domain
      </v-btn>
    </page-title>
    <div slot="page-content">
      <domains-empty v-if="noDomains"></domains-empty>
      <template v-if="!noDomains">
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
              <strong>https://{{ item.name }}.cioty.com/</strong>
            </div>
          </template>
          <template v-slot:[`item.activation`]="{ item }">
            <div align="end">
              <v-btn
                v-if="!item.active"
                :to="{
                  name: 'domain-activate',
                  params: { domainName: item.name }
                }"
                color="secondary"
                class="text-capitalize activate-btn"
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
      </template>
    </div>
    <div v-if="!noDomains && !domainsLengthLessItemsPerPage" slot="pagination">
      <v-pagination v-model="page" :length="pageCount" light></v-pagination>
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainsEmpty from "../components/empty-page/DomainsEmpty";
export default {
  data() {
    return {
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
          text: "Status",
          value: "activation",
          align: "end",
          sortable: false
        }
      ]
    };
  },
  created() {
    this.$socket.emit("get_all_domains", this.token, this.username);
  },
  computed: {
    token() {
      return this.$store.state.authModule.idToken;
    },
    username() {
      return this.$store.state.authModule.username;
    },
    domains() {
      return this.$store.state.domainsModule.ownedDomains;
    },
    domainsLengthLessItemsPerPage() {
      return this.domains.length <= this.itemsPerPage;
    },
    noDomains() {
      return _.isEmpty(this.domains);
    }
  },
  components: {
    PageTitle,
    PageLayout,
    DomainsEmpty
  }
};
</script>

<style scoped>
.activate-btn {
  margin: 0;
}
</style>
