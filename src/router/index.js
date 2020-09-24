import Vue from "vue";
import VueRouter from "vue-router";
import Services from "../views/Services.vue";
import CreateService from "../views/CreateService";
import Notifications from "../views/Notifications.vue";
import DarkSidebar from "../components/DarkSidebar.vue";
import LightSidebar from "../components/LightSidebar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Services
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: Services,
      "dark-sidebar": DarkSidebar
    }
  },
  {
    path: "/services/create-service",
    name: "createService",
    components: {
      default: CreateService,
      "light-sidebar": LightSidebar
    }
  },
  {
    path: "/notifications",
    name: "notifications",
    components: {
      default: Notifications,
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
