<script setup>
import { ref, onMounted } from "vue";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import api from "@/api";
import ProductCard from "@/components/ProductCard.vue";
import VSpinner from "@/components/VSpinner.vue";

const isLoading = ref(true);
const products = ref([]);

onMounted(async () => {
	let response = await api.products.getProducts("?sort_by=new&limit=8");
	isLoading.value = false;
	products.value = response.data.data;
});
</script>

<template>
	<section class="latest-products">
		<h2 class="section-title">Latest Products</h2>

		<div class="container">
			<div class="latest-products__inner">
				<Swiper
					:modules="[Pagination]"
					:pagination="{
						el: '.latest-swiper-pagination',
						clickable: true,
					}"
					:slides-per-view="3"
					:space-between="50"
					:breakpoints="{
						1: {
							slidesPerView: 1,
						},
						576: {
							slidesPerView: 2,
						},
						992: {
							slidesPerView: 3,
						},
					}"
				>
					<swiperSlide v-for="product in products" key="product.id">
						<ProductCard :product="product" />
					</swiperSlide>

					<VSpinner v-if="isLoading" />
					<div class="latest-swiper-pagination"></div>
				</Swiper>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.latest-products {
	margin-top: 130px;

	.latest-swiper-pagination {
		position: static;
		margin-top: 53px;
		text-align: center;
	}

	.spinner {
		margin-top: 40px;
	}
}
.latest-products__inner {
	margin-top: 40px;
}
</style>

<style lang="scss">
.latest-products {
	.swiper-pagination-bullets .swiper-pagination-bullet {
		width: 16px;
		height: 4px;
		background: #fb2e86;
		border-radius: 10px;
		&.swiper-pagination-bullet-active {
			width: 24px;
		}
	}
}
</style>
