import Vue from "vue";
import VueRouter from "vue-router";
import Authorization from "../views/Authorization.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Authorization",
    component: Authorization,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/register/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/login/Login.vue"),
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: () => import("../components/catalog/Catalog.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../components/Profile.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../components/Admin.vue"),
  },
  {
    path: "/catalog/product",
    name: "CatalogDetail",
    component: () => import("../components/catalog/CatalogProductDetail.vue"),
    props: true,
  },
  {
    path: "/catalog/product/buy",
    name: "ConfirmBuy",
    component: () => import("../components/catalog/ConfirmBuy.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
