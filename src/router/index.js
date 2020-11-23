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
import DomainPurchase from "../views/DomainPurchase.vue";
import Instances from "../views/Instances.vue";
import NewInstances from "../views/NewInstances.vue";

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
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/purchase",
    name: "domain-purchase",
    components: {
      default: DomainPurchase,
      "app-bar": AppBar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/domain/:domainName/services",
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
    path: "/domains/domain/:domainName/services/service",
    components: {
      default: ServiceFormView,
      "app-bar": AppBar,
      "light-sidebar": LightSidebar,
      "footer-bar": FooterBar
    },
    children: [
      {
        path: "create",
        name: "serviceCreate"
      },
      {
        path: ":index/edit",
        name: "serviceUpdate"
      }
    ],
    beforeEnter: authGuard
  },
  {
    path: "/domains/domain/:domainName/instances",
    name: "instances",
    components: {
      default: Instances,
      "app-bar": AppBar,
      "dark-sidebar": DarkSidebar,
      "footer-bar": FooterBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/domain/:domainName/instances/new-instances",
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
