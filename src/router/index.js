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
      path: "/catalog/:name*",
      name: "catalog",
      component: () => import("../views/CatalogView.vue"),
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
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },

    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },

     {
      path: "/user/wishlist",
      name: "wishlist",
      component: () => import("../views/WishListView.vue"),
    },

    {
      path: "/order",
      name: "order",
      component: () => import("../views/OrderView.vue"),
    },

    {
      path: "/user/orders",
      name: "orders",
      component: () => import("../views/OrdersView.vue"),
    },
  ],
});

export default router;
