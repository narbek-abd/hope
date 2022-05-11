<script setup>
import { ref } from "vue";

const props = defineProps({
	src: String,
});

const mainImgTransform = ref("translate(-50%, -50%) scale(1)");
const mainImgtransformOrigin = ref("");

function handleMouseOver(e) {
	mainImgTransform.value = "translate(-50%, -50%) scale(2, 2)";
}

function handleMouseOut(e) {
	mainImgTransform.value = "translate(-50%, -50%) scale(1)";
	mainImgtransformOrigin.value = "0% 0%";
}

function handleMouseMove(e) {
	const { left, top, width, height } = e.target.getBoundingClientRect();
	const x = ((e.pageX - (left + window.pageXOffset)) / width) * 100;
	const y = ((e.pageY - (top + window.pageYOffset)) / height) * 100;

	mainImgtransformOrigin.value = `${x}% ${y}%`;
}
</script>

<template>
	<div class="image-zoom">
		<img
			:src="src"
			@mouseover="handleMouseOver"
			@mousemove="handleMouseMove"
			@mouseout="handleMouseOut"
			:style="{
				transform: mainImgTransform,
				'transform-origin': mainImgtransformOrigin,
			}"
			class="image-zoom__img"
			alt="main img"
		/>
	</div>
</template>

<style scoped lang="scss">
.image-zoom {
	width: 375px;
	overflow: hidden;
	position: relative;
	border-radius: 4px;

	&:before {
		content: "";
		padding-bottom: 130%;
		display: block;
		width: 100%;
	}
}

.image-zoom__img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 4px;
}
</style>
