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
              <strong>{{ item.name }}.cioty.com</strong>
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
        <v-pagination
          v-if="!noDomains && !domainsLengthLessItemsPerPage"
          v-model="page"
          :length="pageCount"
          light
        ></v-pagination>
      </v-card>
    </div>
  </page-layout>
</template>

<script>
import _ from "lodash";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainsEmpty from "../components/empty-page/DomainsEmpty";
import DeleteDomain from "../components/domain/DeleteDomain";
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
      return this.$store.state.domainsModule.domains;
    },
    noDomains() {
      return _.isEmpty(this.domains);
    },
    domainsLengthLessItemsPerPage() {
      return this.domains.length <= this.itemsPerPage;
    },
    deleteDomainSuccess() {
      return this.$store.state.alarmModule.deleteDomainSuccess;
    }
  },
  watch: {
    deleteDomainSuccess() {
      this.$socket.emit("get_all_domains", this.token, this.username);
    }
  },
  components: {
    PageTitle,
    PageLayout,
    DomainsEmpty,
    DeleteDomain
  }
};
</script>

<style scoped>
.activate-btn {
  margin: 0;
}
</style>
