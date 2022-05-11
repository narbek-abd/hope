import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    products: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  getters: {
    getTotalQuantity() {
      let quantity = 0;

      this.products.forEach((product) => {
        quantity += product.quantity;
      });

      return quantity;
    },
  },
  actions: {
    addProduct(product_id) {
      let productExists = this.products.find(
        (productItem) => productItem.id === product_id
      );

      if (productExists) {
        productExists.quantity++;
      } else {
        this.products.push({ id: product_id, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(this.products));
    },

    removeProduct(product_id) {
      let filteredProductList = this.products.filter(
        (productItem) => productItem.id !== product_id
      );

      this.products = filteredProductList;
      localStorage.setItem("cart", JSON.stringify(filteredProductList));
    },

    changeProductCount(product_id, count) {
      this.products.forEach((productItem) => {
        if (productItem.id === product_id) {
          productItem.quantity = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(this.products));
    },

    clearCart() {
      localStorage.removeItem("cart");
      this.products = [];
    },
  },
});
