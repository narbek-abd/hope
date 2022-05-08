<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import VButton from "@/components/VButton.vue";
import VIcon from "@/components/VIcon.vue";
import ProductGallery from "@/components/ProductGallery.vue";

const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
});

// const cartProducts = useSelector((state: RootState) => state.cart.products);
// const wishlistProducts = useSelector();

const alreadyInCart = ref(false);
const alreadyInWishlist = ref(false);

// watchEffect(() => {
//    cartProducts.forEach((cartProduct) => {
//      if (cartProduct.id === product.id) {
//        setAlreadyInCart(true);
//      }
//    });
//  }, [cartProducts]);

//  watchEffect(() => {
//    wishlistProducts.forEach((wishlistProduct) => {
//      if (wishlistProduct.id === product.id) {
//        setAlreadyInWishlist(true);
//      }
//    });
//  }, [wishlistProducts]);

function addToCart() {
	dispatch(addProduct(product));

	alreadyInCart.value = true;
}

function addToWishlist() {
	dispatch(addProductToWishlist(product));

	alreadyInWishlist.value = true;
}
</script>

<template>
	<div class="product-main">
		<div class="container">
			<div class="product-main__inner">
				<div class="product-main__left">
					<ProductGallery
						v-if="product.images"
						:image-items="product.images"
					/>
				</div>
				<div class="product-main__right">
					<p class="product-main__name">{{ product.name }}</p>

					<div class="product-main__ratings">
						<div class="product-main__ratings-stars">
							⭐️⭐️⭐️⭐️⭐️
						</div>
						<span class="product-main__ratings-count">(55)</span>
					</div>

					<div class="product-main__price">
						{{ product.price }}
					</div>

					<div class="product-main__quantity">
						<span>Quantity: </span>
						<span>{{ product.quantity }}</span>
					</div>

					<div class="product-main__desc">
						{{ product.description }}
					</div>

					<div class="product-main__actions">
						<VButton @click="addToCart" :disabled="alreadyInCart">
							<span v-if="alreadyInCart">Added to Cart</span>
							<span v-else="alreadyInCart">Add To Cart</span>
						</VButton>

						<VButton
							class="product-main__like-btn"
							@click="addToWishlist"
							:disabled="alreadyInWishlist"
							variant="outlined"
							color="blue"
						>
							<VIcon name="heart" />
						</VButton>
					</div>

					<div class="product-main__categories">
						<p>Category:</p>

						<div>
							<RouterLink
								:to="`/catalog/${product.category.slug}`"
							>
								{{ product.category.name }}
							</RouterLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.product-main {
	margin-top: 150px;

	@media only screen and (max-width: 992px) {
		.container {
			padding: 0;
			max-width: 1500px;
		}
	}
}
.product-main__inner {
	display: flex;

	@media only screen and (max-width: 992px) {
		display: block;
	}
}
.product-main__left {
	width: 547px;
	@media only screen and (max-width: 992px) {
		width: auto;
	}
}
.product-main__right {
	color: var(--color-dark-blue);
	font-family: Josefin Sans;
	font-weight: 600;
	margin-left: 44px;
}
.product-main__name {
	font-size: 36px;
	line-height: 36px;
	color: #0d134e;
	margin-top: 74px;
}
.product-main__ratings {
	margin-top: 13px;
	font-family: Josefin Sans;
	font-weight: 100;
	font-size: 14px;
	line-height: 29px;
	display: flex;
}
.product-main__ratings-stars {
	margin-right: 5px;
}
.product-main__ratings-count {
}
.product-main__price {
	font-family: Josefin Sans;
	font-weight: 100;
	font-size: 16px;
	line-height: 29px;
	color: var(--color-dark-blue);

	span {
		margin-left: 32px;
		text-decoration-line: line-through;
		color: #fb2e86;
	}
}
.product-main__quantity {
	margin-top: 12px;
	line-height: 16px;
	span {
		margin-right: 8px;
	}
}
.product-main__desc {
	margin-top: 12px;
	font-size: 16px;
	line-height: 29px;
	color: #a9acc6;
}
.product-main__actions {
	margin-top: 34px;
	display: flex;
	align-items: center;
}
.product-main__like-btn {
	cursor: pointer;
	padding: 17px 25px;
	background-color: transparent;
	border: none;
	margin-left: 15px;
}
.product-main__categories {
	margin-top: 17px;
	display: flex;

	div {
		margin-left: 16px;
	}
}
</style>
