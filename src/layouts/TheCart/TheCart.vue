<script setup>
import { ref, watchEffect } from "vue";
import { useCartStore } from "@/stores/cart";
import getChildrenIds from "@/utils/getChildrenIds.js";
import VSpinner from "@/components/VSpinner.vue";
import VAlert from "@/components/VAlert.vue";
import VButton from "@/components/VButton.vue";
import { RouterLink } from "vue-router";
import CartProduct from "./CartProduct.vue";
import api from "@/api";

const isLoading = ref(true);
const alertMessage = ref("");

const products = ref([]);
let cart = useCartStore();

watchEffect(() => {
	if (cart.products.length === 0) {
		isLoading.value = false;
		alertMessage.value = "Cart is empty";
		products.value = [];
	}
});

watchEffect(async () => {
	if (cart.products.length === 0) return;

	let ids = getChildrenIds(cart.products);
	try {
		let response = await api.products.getProductsByIds(ids);
		products.value = response.data;
		isLoading.value = false;
	} catch (e) {
		alertMessage.value = "Something wend wrong";
	}
});
</script>

<template>
	<section class="s-cart">
		<div class="cart">
			<div class="container">
				<VSpinner v-if="isLoading" />
				<VAlert v-if="alertMessage" variant="warning">
					{{ alertMessage }}
				</VAlert>

				<div class="cart__list">
					<CartProduct
						v-for="product in products"
						key="product.id"
						:product="product"
					/>
					<RouterLink v-if="products.length > 0" to="/order">
						<VButton>Buy</VButton>
					</RouterLink>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.cart {
	margin-top: 60px;
}
.cart__list {
	.button {
		margin-top: 55px;
		margin-left: auto;
		display: block;
	}
}
</style>
