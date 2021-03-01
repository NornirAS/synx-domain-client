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
                :to="{
                  name: 'domain-activate',
                  params: { domainName: item.name }
                }"
                color="secondary"
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
    </div>
  </page-layout>
</template>

<script>
import { rootDomain } from "../core/config";
import { mapState, mapGetters, mapActions } from "vuex";
import PageTitle from "../components/PageTitle";
import PageLayout from "../components/PageLayout";
import DomainsEmpty from "../components/empty-page/DomainsEmpty";
import DeleteDomain from "../components/domain/DeleteDomain";
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
  created() {
    if (this.noDomains) {
      this.getAllDomains();
    } else {
      this.addDomainsFromStorage;
    }
  },
  methods: {
    ...mapActions("domainsModule", ["addDomainsFromStorage"]),
    getAllDomains() {
      this.$socket.emit("get_all_domains", {
        token: this.token,
        username: this.username
      });
    },
    getAllServices() {
      this.$socket.emit("get_all_services", {
        token: this.token
      });
    },
    getOwnedGhosts() {
      this.$socket.emit("get_owned_ghosts", {
        token: this.token
      });
    }
  },
  computed: {
    ...mapState("authModule", ["token", "username"]),
    ...mapState("domainsModule", ["domains"]),
    ...mapState("alarmModule", ["deleteDomainSuccess"]),
    ...mapGetters("domainsModule", ["noDomains"]),
    domainsLengthLessItemsPerPage() {
      return this.domains.length <= this.itemsPerPage;
    }
  },
  watch: {
    deleteDomainSuccess() {
      this.getAllDomains();
      this.getAllServices();
      this.getOwnedGhosts();
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
