<script setup>
import { ref, watchEffect } from "vue";
import { useCartStore } from "@/stores/cart";
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
let cartStore = useCartStore();

watchEffect(() => {
	let storeProduct = cartStore.products.find(
		(storeProduct) => storeProduct.id === props.product.id
	);

	localProduct.value = storeProduct;
});

function onCountChange(count) {
	cartStore.changeProductCount(props.product.id, count);
}

function removeProduct() {
	cartStore.removeProduct(props.product.id);
}
console.log(localProduct)
</script>

<template>
	<div class="cart__product" v-if="localProduct">
		<div class="cart__product-figure">
			<RouterLink :to="`/product/${product.id}`">
				<img
					class="cart__product-img"
					:src="`${apiUrl}/storage/${product.images[0].image}`"
					:alt="product.name"
				/>
			</RouterLink>
		</div>

		<div class="cart__product-inf">
			<p class="cart__product-name">
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

		<div class="cart__product-calculator">
			<div class="cart__product-pirce">{{ product.price }}</div>

			<div class="cart__product-counter">
				<VCounter
					:min="1"
					:max="product.quantity"
					:current="localProduct.quantity"
					@change="onCountChange"
				/>
			</div>

			<div class="cart__product-totalprice">
				{{ product.price * localProduct.quantity }}
			</div>
		</div>

		<div class="cart__product-remover" @click="removeProduct">X</div>
	</div>
</template>

<style scoped lang="scss">
.cart__product {
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
.cart__product-figure {
	overflow: hidden;
	position: relative;
	width: 83px;
	height: 87px;
}
.cart__product-img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.cart__product-inf {
	margin-left: 17px;
	span {
		display: block;
	}
}
.cart__product-name {
	margin-top: 4px;
	white-space: nowwrap;
}
.cart__product-calculator {
	margin-top: 4px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 87px;
	margin-left: auto;
	@media only screen and (max-width: 576px) {
		flex-direction: column-reverse;
	}
}
.cart__product-pirce {
	margin-left: 90px;
	@media only screen and (max-width: 768px) {
		display: none;
	}
}
.cart__product-counter {
	margin-left: 122px;

	@media only screen and (max-width: 768px) {
		margin-left: 70px;
	}
	@media only screen and (max-width: 576px) {
		margin-left: 0;
	}
}
.cart__product-totalprice {
	margin-left: 140px;
	@media only screen and (max-width: 768px) {
		margin-left: 70px;
	}
	@media only screen and (max-width: 576px) {
		margin-left: 0;
	}
}
.cart__product-remover {
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
