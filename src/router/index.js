import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Homepage from "../views/Homepage";
import Services from "../views/Services";
import Domains from "../views/Domains";
import Ghosts from "../views/Ghosts";
import Account from "../views/Account";
import ServicesTable from "../components/services/ServicesTable";
import ServiceForm from "../components/service/service-form/ServiceForm";
import MicropageForm from "../components/service/micropage-form/MicropageForm";
import SwitchTabs from "../components/service/SwitchTabs";
import DeleteService from "../components/service/DeleteService";
import CreateServiceHints from "../components/service/CreateServiceHints";
import DomainsTable from "../components/domains/DomainsTable";
import NewDomain from "../components/domains/NewDomain";
import AddGhosts from "../components/ghosts/AddGhost";
import GhostsTable from "../components/ghosts/GhostsTable";
import AboutUri from "../components/ghosts/AboutUri";
import GhostDetails from "../components/ghost-details/GhostDetails";
import GhostActions from "../components/ghost-details/GhostActions";
import SideBar from "../components/SideBar";
import PageNotFound from "../components/empty-page/PageNotFound";

Vue.use(VueRouter);
const authGuard = (to, from, next) => {
  const isAuthenticated = store.getters["authentication/isAuthenticated"];
  if (isAuthenticated) {
    next();
  } else {
    next("/");
  }
};

const skipHomeIfAuth = (to, from, next) => {
  const isAuthenticated = store.getters["authentication/isAuthenticated"];
  if (isAuthenticated) {
    next("/services");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: Homepage
    },
    beforeEnter: skipHomeIfAuth
  },
  {
    path: "/domains",
    components: {
      default: Domains,
      "side-bar": SideBar
    },
    children: [
      {
        path: "",
        name: "domains",
        component: DomainsTable,
        meta: {
          title: "Domains"
        }
      },
      {
        path: "create-domain",
        name: "create-domain",
        component: NewDomain,
        meta: {
          title: "New Domain"
        }
      }
    ],
    beforeEnter: authGuard
  },
  {
    path: "/services",
    components: {
      default: Services,
      "side-bar": SideBar
    },
    children: [
      {
        path: "",
        name: "services",
        component: ServicesTable,
        meta: {
          title: "Morphic Services"
        }
      },
      {
        path: "service-create",
        name: "serviceCreate",
        components: {
          default: ServiceForm,
          "other-actions": CreateServiceHints
        },
        meta: {
          title: "New Morphic Service"
        }
      },
      {
        path: ":serviceName/update",
        name: "serviceUpdate",
        components: {
          default: ServiceForm,
          "switch-tabs": SwitchTabs,
          "delete-service": DeleteService
        },
        meta: {
          title: "Update Morphic Service"
        }
      },
      {
        path: ":serviceName/update/micropage",
        name: "micropageUpdate",
        components: {
          default: MicropageForm,
          "switch-tabs": SwitchTabs
        },
        meta: {
          title: "Update Micropage"
        }
      }
    ],
    beforeEnter: authGuard
  },
  {
    path: "/ghosts",
    components: {
      default: Ghosts,
      "side-bar": SideBar
    },
    children: [
      {
        path: "",
        name: "ghosts",
        components: {
          default: AddGhosts,
          secondary: GhostsTable,
          "side-right": AboutUri
        },
        meta: {
          title: "Ghosts"
        }
      },
      {
        path: ":serviceName##:instance",
        name: "ghostDetails",
        components: {
          default: GhostDetails,
          "side-right": GhostActions
        },
        meta: {
          title: "Ghost Details Overview:"
        }
      }
    ],
    beforeEnter: authGuard
  },
  {
    path: "/account",
    name: "account",
    components: {
      default: Account,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
