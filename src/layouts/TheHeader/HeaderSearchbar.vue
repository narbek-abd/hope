<script setup>
import { ref } from "vue";
import VIcon from "@/components/VIcon.vue";
import useDebounce from "@/composable/useDebounce.js";
import { apiUrl } from "@/constants/main.js";
import api from "@/api";
import VClickOutside from "@/directives/VClickOutside.js";

const products = ref([]);
const productsIsVisible = ref(false);
const searchValue = ref("");

useDebounce(searchValue, search);

async function search() {
	if (searchValue.value) {
		let response = await api.products.getProducts(
			`?search=${searchValue.value}`
		);
		products.value = response.data;
		showProducts();
	} else {
		products.value = [];
		hideProducts();
	}
}

function hideProducts() {
	productsIsVisible.value = false;
}

function showProducts() {
	productsIsVisible.value = true;
}
</script>

<template>
	<div class="header__searchbar" v-click-outside="hideProducts">
		<form class="header__searchbar-form">
			<input
				class="header__searchbar-input"
				placeholder="search"
				type="text"
				v-model="searchValue"
				@click="showProducts"
			/>
			<button class="header__searchbar-button">
				<VIcon name="search" />
			</button>
		</form>

		<div v-if="productsIsVisible" class="header__searchbar-products">
			<div
				v-for="product in products"
				key="product.id"
				class="header__searchbar-product"
			>
				<RouterLink to="">
					<img
						class="header__searchbar-product__img"
						:src="`${apiUrl}/storage/${product.images[0].image}`"
					/>

					<span class="header__searchbar-product__name">{{
						product.name
					}}</span>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.header__searchbar {
	margin-left: auto;
	position: relative;

	@media only screen and (max-width: 768px) {
		margin-left: 10px;
		margin-right: 10px;
	}
}
.header__searchbar-form {
	display: flex;
}
.header__searchbar-input {
	border: 1px solid var(--color-dark-blue);
	padding: 0 15px;
	width: 265px;
	@media only screen and (max-width: 992px) {
		width: 200px;
	}
	@media only screen and (max-width: 480px) {
		width: calc(100% - 51px);
	}
}
.header__searchbar-button {
	width: 51px;
	height: 40px;
	background-color: var(--color-pink);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		color: #fff;
		width: 20px;
		height: 20px;
	}
}
.header__searchbar-products {
	position: absolute;
	top: 40px;
	width: 100%;
	background-color: #fff;
	z-index: 999;
}
.header__searchbar-product {
	padding: 9px 9px 9px 15px;

	a {
		display: flex;
		align-items: center;
		color: var(--color-dark-blue);

		@media only screen and (max-width: 480px) {
			font-size: 13px;
		}
	}
}
.header__searchbar-product__img {
	width: 25px;
	height: 25px;

	@media only screen and (max-width: 480px) {
		display: none;
	}
}
.header__searchbar-product__name {
	margin-left: 9px;
}
</style>
