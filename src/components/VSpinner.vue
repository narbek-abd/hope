<script setup>
const props = defineProps({
	size: {
		validator(value) {
			return ["medium", "small"].includes(value);
		},
		default: "medium",
	},
});
</script>

<template>
	<div class="spinner" :class="`spinner--${size}`"></div>
</template>

<style scoped lang="scss">
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.spinner {
	border: 3px solid transparent;
	border-radius: 50%;
	display: block;
	margin: 0 auto;
	width: 60px;
	height: 60px;
	animation: spin 2s linear infinite;
	border-top: 3px solid var(--color-pink);
}

.spinner--small {
	display: inline-block;
	width: 20px;
	height: 20px;
	border-top: 3px solid #fff;
	position: absolute;
	top: calc(50% - 9px);
	right: calc(50% - 9px);
}
</style>
