<script setup>
import Icons from "../assets/symbol-defs.svg";

defineProps({
	name: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<svg class="icon" :class="[`icon-${name}`]">
		<use :href="Icons + '#' + name" />
	</svg>
</template>
<style scoped></style>
