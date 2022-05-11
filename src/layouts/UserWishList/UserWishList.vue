<script setup>
import { ref, watchEffect } from "vue";
import { useWishListStore } from "@/stores/wishList.js";
import getChildrenIds from "@/utils/getChildrenIds.js";
import VSpinner from "@/components/VSpinner.vue";
import VAlert from "@/components/VAlert.vue";
import VButton from "@/components/VButton.vue";
import { RouterLink } from "vue-router";
import UserWishListItem from "./UserWishListItem.vue";
import api from "@/api";

const isLoading = ref(true);
const alertMessage = ref("");

const products = ref([]);
let wishListStore = useWishListStore();

watchEffect(() => {
	if (wishListStore.products.length === 0) {
		isLoading.value = false;
		alertMessage.value = "wishlist is empty";
		products.value = [];
	}
});

watchEffect(async () => {
	if (wishListStore.products.length === 0) return;

	let ids = getChildrenIds(wishListStore.products);
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
	<section class="s-wishlist">
		<div class="wishlist">
			<div class="container">
				<VSpinner v-if="isLoading" />
				<VAlert v-if="alertMessage" variant="warning">
					{{ alertMessage }}
				</VAlert>

				<div class="wishlist__list">
					<UserWishListItem
						v-for="product in products"
						key="product.id"
						:product="product"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.wishlist {
	margin-top: 60px;
}
.wishlist__list {
	.button {
		margin-top: 55px;
		margin-left: auto;
		display: block;
	}
}
</style>
