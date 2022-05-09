<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import api from "@/api";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import VSpinner from "@/components/VSpinner.vue";
import TheProduct from "@/layouts/TheProduct.vue";

const isLoading = ref(true);
const product = ref(null);

const route = useRoute();
const productId = route.params.id;

watchEffect(async () => {
  let response = await api.products.getProduct(productId);

  isLoading.value = false;
  product.value = response.data;
});

const customRoutes = ref([]);

watchEffect(() => {
  if (!product.value) return;

  let breadCrumbs = [
    {
      name: product.value.category.name,
      url: product.value.category.slug,
    },
  ];

  if (product.value.category.parent) {
    getParentCategories(product.value.category.parent);
  }

  function getParentCategories(parent) {
    breadCrumbs.unshift({ name: parent.name, url: parent.slug });

    if (parent.parent) {
      getParentCategories(parent.parent);
    }
  }

  breadCrumbs.unshift({ name: "Catalog", url: "catalog" });
  breadCrumbs.push({ name: product.value.name, url: "" });

  customRoutes.value = breadCrumbs;
});
</script>

<template>
  <div class="container">
    <BreadCrumbs v-if="customRoutes.length > 0" :custom-routes="customRoutes" />
  </div>

  <VSpinner v-if="isLoading" />
  <TheProduct v-if="product" :product="product" />
  <!-- <TheComments v-if="product" :product-id="product.id" /> -->
</template>
