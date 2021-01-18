import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Services from "../views/Services.vue";
import ServiceFormView from "../views/ServiceFormView";
import SideBar from "../components/SideBar";
import Domains from "../views/Domains.vue";
import DomainActivation from "../views/DomainActivation.vue";
import Resources from "../views/Resources.vue";
import NewInstances from "../views/NewInstances.vue";
import ServiceForm from "../components/service-form/ServiceForm";
import MicropageForm from "../components/micropage-form/MicropageForm";
import Account from "../views/Account";
import CheckoutSuccess from "../views/CheckoutSuccess";
import CreateDomain from "../views/CreateDomain";

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    next("/");
  }
};

const skipHomeIfAuth = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next("/domains");
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
    name: "domains",
    components: {
      default: Domains,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/create-domain",
    name: "create-domain",
    components: {
      default: CreateDomain,
      "side-bar": SideBar
    }
  },
  {
    path: "/domains/:domainName/checkout-success",
    name: "checkout-success",
    component: CheckoutSuccess,
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
  {
    path: "/domains/:domainName/activate",
    name: "domain-activate",
    components: {
      default: DomainActivation,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: Services,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/services/service",
    components: {
      default: ServiceFormView,
      "side-bar": SideBar
    },
    children: [
      {
        path: "create",
        name: "serviceCreate",
        component: ServiceForm
      },
      {
        path: ":index/:serviceName/update",
        name: "serviceUpdate",
        component: ServiceForm
      },
      {
        path: ":index/:serviceName/micropage",
        name: "micropageUpdate",
        component: MicropageForm
      }
    ],
    beforeEnter: authGuard
  },
  {
    path: "/network-resources",
    name: "resources",
    components: {
      default: Resources,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/network-resources/ghosts",
    name: "new-instances",
    components: {
      default: NewInstances,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
