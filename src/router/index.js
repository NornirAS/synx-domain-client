import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Services from "../views/Services.vue";
import ServiceFormView from "../views/ServiceFormView";
import AppBar from "../components/AppBar.vue";
import DarkSidebar from "../components/sidebars/DarkSidebar.vue";
import LightSidebar from "../components/sidebars/LightSidebar.vue";
import FooterBar from "../components/FooterBar.vue";
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
      "app-bar": AppBar,
      "dark-sidebar": DarkSidebar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/create-domain",
    name: "create-domain",
    component: CreateDomain
  },
  {
    path: "/domains/checkout-success",
    name: "checkout-success",
    component: CheckoutSuccess,
    beforeEnter: authGuard
  },
  {
    path: "/account",
    name: "account",
    components: {
      default: Account,
      "app-bar": AppBar,
      "dark-sidebar": DarkSidebar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/:domainName/activate",
    name: "domain-activate",
    components: {
      default: DomainActivation,
      "app-bar": AppBar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: Services,
      "app-bar": AppBar,
      "dark-sidebar": DarkSidebar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/services/service",
    components: {
      default: ServiceFormView,
      "app-bar": AppBar,
      "light-sidebar": LightSidebar,
      "footer-bar": FooterBar
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
      "app-bar": AppBar,
      "dark-sidebar": DarkSidebar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/network-resources/ghosts",
    name: "new-instances",
    components: {
      default: NewInstances,
      "app-bar": AppBar,
      "dark-sidebar": DarkSidebar,
      "footer-bar": FooterBar
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
