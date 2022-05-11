import { defineStore } from "pinia";

export const useWishListStore = defineStore({
  id: "wishlist",
  state: () => ({
    products: JSON.parse(localStorage.getItem("wishlist")) || [],
  }),
  actions: {
    addProduct(product_id) {
      let alreadyInWishlist = this.products.find(
        (storageProduct) => storageProduct.id === product_id
      );
      if (alreadyInWishlist) return;

      this.products.push({ id: product_id });

      localStorage.setItem("wishlist", JSON.stringify(this.products));
    },

    removeProduct(product_id) {
      let filteredProductList = this.products.filter(
        (productItem) => productItem.id !== product_id
      );
      localStorage.setItem("wishlist", JSON.stringify(filteredProductList));
      this.products = filteredProductList;
    },

    clearWishList() {
      localStorage.removeItem("wishlist");
      this.products = [];
    },
  },
});
