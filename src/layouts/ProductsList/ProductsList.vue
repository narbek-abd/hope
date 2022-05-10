<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, stringifyQuery } from "vue-router";
import getChildrenIds from "@/utils/getChildrenIds.js";
import api from "@/api";
import ProductsListSort from "./ProductsListSort.vue";
import ProductsListFilter from "./ProductsListFilter.vue";
import ProductCard from "@/components/ProductCard.vue";
import VAlert from "@/components/VAlert.vue";
import VSpinner from "@/components/VSpinner.vue";
import VPagination from "@/components/VPagination.vue";

const isLoading = ref(true);
const alertMessage = ref(null);
const products = ref([]);

const route = useRoute();

const perPage = 6;
const totalItems = ref(0);

const categoryChildrens = ref([]);

watchEffect(async () => {
	products.value = [];
	isLoading.value = true;

	let locationArray = route.path.replace(/\/$/, "").split("/");
	let currentCategorySlug = locationArray[locationArray.length - 1];

	if (currentCategorySlug === "catalog") {
		let response = await api.categories.getCategoriesWithChildren();

		categoryChildrens.value = response.data;
		getProducts();
	} else {
		let response = await api.categories.getCategoryBySlug(
			currentCategorySlug
		);

		categoryChildrens.value = response.data.children;

		let categoriesIds = getSubCategoryIds(response.data);
		getProducts(categoriesIds);
	}
});

async function getProducts(categoryIds = "") {
	let sortBy = defaultSortBy();

	try {
		let response = await api.products.getProducts(
			`?limit=${perPage}&${sortBy}&${categoryIds}&${stringifyQuery(
				route.query
			)}`
		);

		isLoading.value = false;
		let resultProducts = response.data.data;

		if (resultProducts.length === 0) {
			products.value = [];
			alertMessage.value = "List is empty";
			return;
		}
		products.value = resultProducts;
		totalItems.value = response.data.total;
		alertMessage.value = "";
	} catch (err) {
		isLoading.value = false;
		alertMessage.value = "Something went wrong, try later";
	}
}

function getSubCategoryIds(currentCategory) {
	let categories = "";

	if (!route.query.categories || route.query.categories.length === 0) {
		let currentCategoryId = currentCategory.id;
		let categoryIds = getChildrenIds(currentCategory.children);
		categoryIds.push(currentCategoryId);

		let categoryIdsJoined = categoryIds.join("-");

		categories = `categories=${categoryIdsJoined}`;
	}

	return categories;
}

function defaultSortBy() {
	let sortBy = "";

	if (!route.query.sort_by) {
		sortBy = "sort_by=new";
	}

	return sortBy;
}
</script>

<template>
	<div class="catalog-products">
		<div class="container">
			<ProductsListSort />

			<div class="catalog-products__box">
				<ProductsListFilter :categoryChildrens="categoryChildrens" />

				<div class="catalog-products__list">
					<div
						class="catalog-products__item"
						v-for="product in products"
						key="product.id"
					>
						<ProductCard :product="product" />
					</div>

					<VAlert v-if="alertMessage">{{ alertMessage }}</VAlert>
					<VSpinner v-if="isLoading" />
				</div>
			</div>

			<div class="catalog-products__pagination">
				<VPagination
					v-if="totalItems !== 0"
					:total-items="totalItems"
					:per-page="perPage"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.catalog-products {
	margin-top: 126px;
}
.catalog-products__pagination {
	justify-content: center;
	margin-top: 60px;
}
.catalog-products__box {
	display: flex;
	justify-content: space-between;
	margin-top: 60px;
}
.catalog-products__list {
	width: calc(100% - 300px);
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	justify-content: space-between;

	.spinner {
		margin: 30px auto 0 auto;
	}
}

.catalog-products__item {
	width: 32%;
	margin-bottom: 50px;

	@media only screen and (max-width: 1200px) {
		width: 49%;
	}

	@media only screen and (max-width: 992px) {
		width: 32%;
	}

	@media only screen and (max-width: 576px) {
		width: 49%;
	}
	@media only screen and (max-width: 480px) {
		width: 100%;
	}
}
.catalog-products__pagination {
}
</style>
