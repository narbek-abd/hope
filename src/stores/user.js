import { watchEffect } from "vue";
import { defineStore } from "pinia";
import api from "@/api";
import Cookies from "js-cookie";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: "",
    name: "",
    email: "",
  }),
  getters: {},
  actions: {
    setUser(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
    },

    async deleteUser(user) {
      await api.users.logoutUser();
      Cookies.remove("auth-token");

      this.id = "";
      this.name = "";
      this.email = "";
    },
  },
});
