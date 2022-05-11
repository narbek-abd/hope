<script setup>
import { ref, watchEffect } from "vue";
import { useWishListStore } from "@/stores/wishList";
import { RouterLink } from "vue-router";
import VCounter from "@/components/VCounter.vue";
import { apiUrl } from "@/constants/main";

const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
});
const localProduct = ref(null);
let wishListStore = useWishListStore();

watchEffect(() => {
	let storeProduct = wishListStore.products.find(
		(storeProduct) => storeProduct.id === props.product.id
	);

	localProduct.value = storeProduct;
});

function removeProduct() {
	wishListStore.removeProduct(props.product.id);
}
</script>

<template>
	<div class="wishlist__product" v-if="localProduct">
		<div class="wishlist__product-figure">
			<RouterLink :to="`/product/${product.id}`">
				<img
					class="wishlist__product-img"
					:src="`${apiUrl}/storage/${product.images[0].image}`"
					:alt="product.name"
				/>
			</RouterLink>
		</div>

		<div class="wishlist__product-inf">
			<p class="wishlist__product-name">
				<RouterLink :to="`/product/${product.id}`">
					{{ product.name }}
				</RouterLink>
			</p>

			<span
				>Category:
				<RouterLink :to="`/catalog/${product.category.slug}`">{{
					product.category.name
				}}</RouterLink></span
			>
		</div>

		<div class="wishlist__product-remover" @click="removeProduct">X</div>
	</div>
</template>

<style scoped lang="scss">
.wishlist__product {
	display: flex;
	align-items: center;
	font-size: 14px;
	line-height: 14px;
	color: #000000;
	position: relative;
	margin-bottom: 30px;

	&:after {
		content: "";
		position: absolute;
		bottom: -15px;
		width: 100%;
		border: 1px solid #e1e1e4;
	}
}
.wishlist__product-figure {
	overflow: hidden;
	position: relative;
	width: 83px;
	height: 87px;
}
.wishlist__product-img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.wishlist__product-inf {
	margin-left: 17px;
	span {
		display: block;
	}
}
.wishlist__product-name {
	margin-top: 4px;
	white-space: nowwrap;
}

.wishlist__product-pirce {
	margin-left: 90px;
	@media only screen and (max-width: 768px) {
		display: none;
	}
}

.wishlist__product-remover {
	position: absolute;
	top: 0;
	right: 0;
	background-color: #000;
	width: 15px;
	height: 15px;
	color: #fff;
	border-radius: 100px;
	text-align: center;
	font-size: 12px;
	cursor: pointer;
}
</style>
