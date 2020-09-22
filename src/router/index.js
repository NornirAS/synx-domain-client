import Vue from "vue";
import VueRouter from "vue-router";
import Services from "../views/Services.vue";
import CreateService from "../views/CreateService";

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
    component: Services
  },
  {
    path: "/create-service",
    name: "createServiceUrl",
    component: CreateService
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
