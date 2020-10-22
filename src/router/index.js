import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Services from "../views/Services.vue";
import CreateService from "../views/CreateService";
import EditService from "../views/EditService";
import Notifications from "../views/Notifications.vue";
import Appbar from "../components/Appbar.vue";
import DarkSidebar from "../components/sidebars/DarkSidebar.vue";
import LightSidebar from "../components/sidebars/LightSidebar.vue";
import SignIn from "../views/SignIn.vue";
import Domains from "../views/Domains.vue";
import DomainPromo from "../views/DomainPromo.vue";
import DomainPurchase from "../views/DomainPurchase.vue";

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    next("signin");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: Homepage
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: Services,
      "app-bar": Appbar,
      "dark-sidebar": DarkSidebar
    },
    beforeEnter: authGuard
  },
  {
    path: "/services/service/create",
    name: "createService",
    components: {
      default: CreateService,
      "app-bar": Appbar,
      "light-sidebar": LightSidebar
    },
    beforeEnter: authGuard
  },
  {
    path: "/services/service/:index/edit",
    name: "editService",
    components: {
      default: EditService,
      "app-bar": Appbar,
      "light-sidebar": LightSidebar
    },
    beforeEnter: authGuard
  },
  {
    path: "/notifications",
    name: "notifications",
    components: {
      default: Notifications,
      "app-bar": Appbar,
      "dark-sidebar": DarkSidebar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains",
    name: "domains",
    components: {
      default: Domains,
      "app-bar": Appbar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domain-promo",
    name: "domain-promo",
    components: {
      default: DomainPromo,
      "app-bar": Appbar
    },
    beforeEnter: authGuard
  },
  {
    path: "/domain-purchase",
    name: "domain-purchase",
    components: {
      default: DomainPurchase,
      "app-bar": Appbar
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
