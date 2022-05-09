import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/product/:id",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: () => {
        useUserStore().redirectAuthenticated();
      },
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: () => {
        useUserStore().redirectAuthenticated();
      },
    },

    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
  ],
});

export default router;
