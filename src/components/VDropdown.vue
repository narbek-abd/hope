<script setup>
import { ref } from "vue";
import VClickOutside from "@/directives/VClickOutside.js";

const props = defineProps({
	position: {
		validator(value) {
			return ["left", "right", "middle"].includes(value);
		},
		default: "left",
	},
});

const isVisible = ref(false);

function hideDropdown() {
	isVisible.value = false;
}

</script>

<template>
	<div class="dropdown" v-click-outside="hideDropdown">
		<span class="dropdown__toggle" @click="isVisible = !isVisible">
			<slot name="title"></slot>
		</span>

		<ul
			v-if="isVisible"
			class="dropdown__list"
			:class="`dropdown__list--${props.position}`"
		>
			<slot></slot>
		</ul>
	</div>
</template>

<style lang="scss">
.dropdown {
	position: relative;
}

.dropdown__toggle {
	cursor: pointer;
}

.dropdown__list {
	position: absolute;
	z-index: 99;
}

.dropdown__list--right {
	right: 0;
}
</style>
