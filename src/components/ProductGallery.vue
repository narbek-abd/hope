<script setup>
import { ref } from "vue";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { apiUrl } from "@/constants/main.js";

import VIcon from "@/components/VIcon.vue";
import ImageZoom from "@/components/ImageZoom.vue";

const props = defineProps({
	imageItems: {
		type: Array,
		required: true,
	},
});
const mainImg = ref(props.imageItems[0]);

function changeMainImg(id) {
	let selectedImg = props.imageItems.find((image) => image.id === id);

	mainImg.value = selectedImg;
}
</script>

<template>
	<div class="product-gallery">
		<div class="product-gallery__left">
			<div className="swiper-button-prev">
				<VIcon name="arrow" />
			</div>

			<Swiper
				:modules="[Navigation]"
				:navigation="{
					prevEl: '.swiper-button-prev',
					nextEl: '.swiper-button-next',
				}"
				:spaceBetween="0"
				:breakpoints="{
					1: {
						slidesPerView: 'auto',
						direction: 'horizontal',
						centeredSlides: true,
					},
					992: {
						slidesPerView: 3,
						direction: 'vertical',
					},
				}"
				:style="{ height: '490px' }"
			>
				<SwiperSlide
					v-for="imageItem in imageItems"
					@click="changeMainImg(imageItem.id)"
					key="imageItem.id"
				>
					<div
						class="product-gallery__image-wrapper"
						:class="{
							'product-gallery__image-wrapper--active':
								imageItem.image === mainImg.image,
						}"
					>
						<img
							class="product-gallery__image"
							:src="`${apiUrl}/storage/${imageItem.image}`"
							:alt="imageItem.name"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
			<div className="swiper-button-next">
				<VIcon name="arrow" />
			</div>
		</div>
		<div class="product-gallery__right">
			<ImageZoom :src="`${apiUrl}/storage/${mainImg.image}`" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.product-gallery {
	display: flex;
	align-items: center;

	@media only screen and (max-width: 992px) {
		display: block;
	}
}
.product-gallery__left {
	.swiper-slide {
		@media only screen and (max-width: 992px) {
			width: 72%;
		}

		@media only screen and (max-width: 778px) {
			width: 90%;
		}
	}
	.swiper-button-prev,
	.swiper-button-next {
		width: 30px;
		height: 30px;
		background-color: #0000004f;
		color: #fff;
		border-radius: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		margin: 30px auto;

		&.swiper-button-disabled {
			background-color: #fff;
			svg {
				color: #fff;
			}
		}

		@media only screen and (max-width: 992px) {
			display: none;
		}
	}

	.swiper-button-prev {
		transform: rotate(180deg);
	}
}
.product-gallery__image-wrapper {
	overflow: hidden;
	border-radius: 3px;
	position: relative;

	position: relative;
	width: 150px;
	height: 155px;
	cursor: pointer;
	border: 2px solid transparent;
	border-radius: 4px;

	@media only screen and (max-width: 992px) {
		width: 500px;
		height: 100%;
		border-color: transparent;
	}
	@media only screen and (max-width: 768px) {
		width: 100%;
	}
}
.product-gallery__image-wrapper--active {
	border-color: var(--color-pink);
}
.product-gallery__image {
	border-radius: 4px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.product-gallery__right {
	margin-left: 21px;
	@media only screen and (max-width: 992px) {
		display: none;
	}
}
</style>
