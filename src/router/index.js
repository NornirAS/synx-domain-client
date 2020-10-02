import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Services from "../views/Services.vue";
import CreateService from "../views/CreateService";
import Notifications from "../views/Notifications.vue";
import Appbar from "../components/Appbar.vue";
import DarkSidebar from "../components/sidebars/DarkSidebar.vue";
import LightSidebar from "../components/sidebars/LightSidebar.vue";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

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
    }
  },
  {
    path: "/services/create-service",
    name: "createService",
    components: {
      default: CreateService,
      "app-bar": Appbar,
      "light-sidebar": LightSidebar
    }
  },
  {
    path: "/notifications",
    name: "notifications",
    components: {
      default: Notifications,
      "app-bar": Appbar,
      "dark-sidebar": DarkSidebar
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
