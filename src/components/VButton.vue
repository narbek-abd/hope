<script setup>
import { computed } from "vue";
import VSpinner from "@/components/VSpinner.vue";

const props = defineProps({
	variant: {
		validator(value) {
			return ["contained", "outlined"].includes(value);
		},
		default: "contained",
	},

	size: {
		validator(value) {
			return ["small", "large"].includes(value);
		},
		default: "large",
	},

	color: {
		validator(value) {
			return ["pink", "danger", "warning", "blue"].includes(value);
		},
		default: "pink",
	},

	disabled: Boolean,
	isLoading: Boolean,
});
</script>

<template>
	<button
		class="btn"
		:class="[`btn--${color}`, `btn--${variant}`, `btn--${size}`]"
		:disabled="props.disabled || props.isLoading"
	>
		<template v-if="isLoading">
			<span><slot></slot></span>
			<VSpinner size="small" />
		</template>

		<template v-else>
			<slot></slot>
		</template>
	</button>
</template>

<style scoped lang="scss">
.btn {
	font-size: 17px;
	font-weight: 600;
	color: #fff;
	border-radius: 3px;
	padding: 17px 47px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 1;
	transition: all 0.2s ease-in-out;
	position: relative;
}

.btn:disabled {
	opacity: 0.8;

	span {
		opacity: 0;
	}
}

.btn--small {
	font-size: 15px;
	padding: 6px 12px;
}

.btn--contained.btn--pink {
	background-color: var(--color-pink);
}

.btn--contained.btn--danger {
	background-color: #dc3545;
}

.btn--contained.btn--warning {
	background-color: #ffc107;
}

.btn--contained.btn--blue {
	background-color: var(--color-dark-blue);
}

.btn--outlined.btn--blue {
	border: 2px solid var(--color-dark-blue);
	color: var(--color-dark-blue);

	.spinner {
		border-top-color: #dc3545;
	}
}
</style>
