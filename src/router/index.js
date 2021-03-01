import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage";
import Services from "../views/Services";
import ServicesPage from "../components/services/ServicesPage";
import ServicePage from "../components/service/ServicePage";
import SideBar from "../components/SideBar";
import Domains from "../views/Domains";
import DomainActivation from "../views/DomainActivation";
import Ghosts from "../views/Ghosts";
import GhostDetails from "../views/GhostDetails";
import ServiceForm from "../components/service/service-form/ServiceForm";
import Account from "../views/Account";
import CheckoutSuccess from "../components/domain/CheckoutSuccess";
import CreateDomain from "../views/CreateDomain";
import PageNotFound from "../components/empty-page/PageNotFound";
import MicropageForm from "../components/service/micropage-form/MicropageForm";

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
    },
    beforeEnter: authGuard
  },
  {
    path: "/domains/:domainName/checkout-success",
    name: "checkout-success",
    components: {
      default: CheckoutSuccess,
      "side-bar": SideBar
    },
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
    components: {
      default: Services,
      "side-bar": SideBar
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
            component: ServiceForm
          },
          {
            path: ":serviceName/update",
            name: "serviceUpdate",
            component: ServiceForm
          },
          {
            path: ":serviceName/update/micropage",
            name: "micropageUpdate",
            component: MicropageForm
          }
        ]
      }
    ],
    beforeEnter: authGuard
  },
  // {
  //   path: "/services/service",
  //   components: {
  //     default: ServiceFormView,
  //     "side-bar": SideBar
  //   },
  //   children: [
  //     {
  //       path: "create",
  //       name: "serviceCreate",
  //       component: ServiceForm
  //     },
  //     {
  //       path: ":serviceName/update",
  //       name: "serviceUpdate",
  //       component: ServiceForm
  //     },
  //     {
  //       path: ":serviceName/update/micropage",
  //       name: "micropageUpdate",
  //       component: MicropageForm
  //     }
  //   ],
  //   beforeEnter: authGuard
  // },
  {
    path: "/ghosts",
    name: "ghosts",
    components: {
      default: Ghosts,
      "side-bar": SideBar
    },
    beforeEnter: authGuard
  },
  {
    path: "/ghosts/:serviceName#:instance",
    name: "ghostDetails",
    components: {
      default: GhostDetails,
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
