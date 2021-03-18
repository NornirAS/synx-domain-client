import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage";
import Services from "../views/Services";
import Domains from "../views/Domains";
import Ghosts from "../views/Ghosts";
import Account from "../views/Account";
import ServicesTable from "../components/services/ServicesTable";
import ServiceForm from "../components/service/service-form/ServiceForm";
import MicropageForm from "../components/service/micropage-form/MicropageForm";
import SwitchTabs from "../components/service/SwitchTabs";
import OtherActions from "../components/service/OtherActions";
import DomainsTable from "../components/domains/DomainsTable";
import NewDomain from "../components/domains/NewDomain";
import CheckoutSuccess from "../components/domains/CheckoutSuccess";
import GhostsPage from "../components/ghosts/GhostsPage";
import GhostDetailsPage from "../components/ghost-details/GhostDetailsPage";
import SideBar from "../components/SideBar";
import PageNotFound from "../components/empty-page/PageNotFound";

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  if (sessionStorage.getItem("token")) {
    next();
  } else {
    next("/");
  }
};

const skipHomeIfAuth = (to, from, next) => {
  if (sessionStorage.getItem("token")) {
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
    path: "/domains/domain/:domainName/checkout-success",
    name: "checkout-success",
    component: CheckoutSuccess,
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
        component: ServiceForm,
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
          "other-actions": OtherActions
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
        component: GhostsPage
      },
      {
        path: ":serviceName##:instance",
        name: "ghostDetails",
        component: GhostDetailsPage
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
    meta: {
      breadcrumb: "Account"
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
