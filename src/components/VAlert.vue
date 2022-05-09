<script setup>
import { ref } from "vue";
const props = defineProps({
	variant: {
		validator(value) {
			return ["error", "success", "warning"].includes(value);
		},
		default: "success",
	},
});

const isVisible = ref(true);
</script>

<template>
	<div v-if="isVisible" class="alert" :class="`alert--${variant}`">
		<slot></slot>
		<button @click="isVisible = false" class="alert__btn">X</button>
	</div>
</template>

<style scoped lang="scss">
.alert {
	padding: 16px 50px 16px 16px;
	border-radius: 0.25rem;
	position: relative;
}
.alert--error {
	color: #842029;
	background-color: #f8d7da;
	border-color: #f5c2c7;
}
.alert--success {
	color: #0f5132;
	background-color: #d1e7dd;
	border-color: #badbcc;
}
.alert--warning {
	border-color: rgb(255, 244, 229);
	background-color: rgb(255, 244, 229);
	color: rgb(102, 60, 0);
}
.alert__btn {
	position: absolute;
	top: calc(50% - 18px);
	right: 0;
	z-index: 2;
	padding: 10px;
	background-color: transparent;
	color: #333;
}
</style>
