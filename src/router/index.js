import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage";
import Services from "../views/Services";
import Domains from "../views/Domains";
import Ghosts from "../views/Ghosts";
import Account from "../views/Account";
import ServicesPage from "../components/services/ServicesPage";
import ServicePage from "../components/service/ServicePage";
import ServiceForm from "../components/service/service-form/ServiceForm";
import MicropageForm from "../components/service/micropage-form/MicropageForm";
import DomainsPage from "../components/domains/DomainsPage";
import CreateDomain from "../components/domain/CreateDomain";
import DomainActivation from "../components/domain/DomainActivation";
import CheckoutSuccess from "../components/domain/CheckoutSuccess";
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
    meta: {
      breadcrumb: "Domains"
    },
    children: [
      {
        path: "",
        name: "domains",
        component: DomainsPage
      },
      {
        path: "domain/create-domain",
        name: "create-domain",
        component: CreateDomain,
        meta: {
          breadcrumb: "Create Domain"
        }
      },
      {
        path: "domain/:domainName/activate",
        name: "domain-activate",
        component: DomainActivation,
        meta: {
          breadcrumb: "Activate Domain"
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
    meta: {
      breadcrumb: "Services"
    },
    children: [
      {
        path: "",
        name: "services",
        component: ServicesPage
      },
      {
        path: "service",
        component: ServicePage,
        children: [
          {
            path: "create",
            name: "serviceCreate",
            component: ServiceForm,
            meta: {
              breadcrumb: "Create Service"
            }
          },
          {
            path: ":serviceName/update",
            name: "serviceUpdate",
            component: ServiceForm,
            meta: {
              breadcrumb: "Service Update"
            }
          },
          {
            path: ":serviceName/update/micropage",
            name: "micropageUpdate",
            component: MicropageForm,
            meta: {
              breadcrumb: "Micropage"
            }
          }
        ]
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
    meta: {
      breadcrumb: "Ghosts"
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
        component: GhostDetailsPage,
        meta: {
          breadcrumb: "Ghosts Details"
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
