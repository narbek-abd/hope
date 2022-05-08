<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import VIcon from "@/components/VIcon.vue";
import VButton from "@/components/VButton.vue";
import { apiUrl } from "@/constants/main.js";

const props = defineProps(["product"]);

const alreadyInCart = ref(false);
const alreadyInWishlist = ref(false);

function addToCart() {}

function addToWishlist() {}
</script>

<template>
	<div class="product-card">
		<RouterLink :to="`/product/${product.id}`">
			<div class="product-card__figure">
				<img
					:src="`${apiUrl}/storage/${product.images[0].image}`"
					:alt="product.name"
					class="product-card__img"
				/>
			</div>

			<div class="product-card__inf">
				<p class="product-card__name">{{ product.name }}</p>
				<div class="product-card__prices">
					<div class="product-card__price">{{ product.price }}</div>
					<div class="product-card__price">65$</div>
				</div>
			</div>
		</RouterLink>

		<div class="product-card__actions">
			<VButton
				size="small"
				color="blue"
				@click="addToCart"
				:disabled="alreadyInCart"
			>
				<VIcon name="basket" />
			</VButton>

			<VButton
				size="small"
				color="blue"
				@click="addToWishlist"
				:disabled="alreadyInWishlist"
			>
				<VIcon name="heart" />
			</VButton>
		</div>
	</div>
</template>

<style scoped lang="scss">
.product-card {
	position: relative;
	&:hover {
		background-color: #ebf4f3;
		.product-card__actions {
			opacity: 1;
			visibility: 1;
		}
	}
}
.product-card__figure {
	position: relative;
	overflow: hidden;

	&:before {
		content: "";
		padding-bottom: 110%;
		display: block;
		width: 100%;
	}
}
.product-card__img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.product-card__inf {
	color: var(--color-dark-blue);
	margin-top: 30px;
}
.product-card__name {
	font-family: Josefin Sans;
	font-weight: bold;
	font-size: 18px;
	text-align: center;
	display: block;
	width: 100%;
}
.product-card__prices {
	font-family: Josefin Sans;
	text-align: center;
	margin-top: 15px;
}
.product-card__price {
	font-size: 14px;

	font-size: 12px;
	color: #fb2448;
	margin-left: 10px;
	text-decoration-line: line-through;
}
.product-card__actions {
	opacity: 0;
	visibility: 0;
	position: absolute;
	top: 174px;
	left: 11px;
	display: flex;
	flex-direction: column;
	transition: var(--opacity-tr);

	.btn {
		padding: 10px;
		cursor: pointer;
		margin-bottom: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
	}

	svg {
		color: #fff;
		width: 19px;
		height: 19px;
		&:not(:last-child) {
			margin-bottom: 14px;
		}
	}
}
</style>
