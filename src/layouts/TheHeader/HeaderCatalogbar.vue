<script setup>
import { ref, onMounted } from "vue";
import CatalogMenu from "@/components/CatalogMenu.vue";
import VIcon from "@/components/VIcon.vue";
import VClickOutside from "@/directives/VClickOutside.js";
import api from "@/api";

const categories = ref([]);
const isCatalogMenuVisible = ref(false);

onMounted(async () => {
	let response = await api.categories.getCategoriesWithChildren();
	categories.value = response.data;
});

function hideCatalogMenu(e) {
	if (
		isCatalogMenuVisible &&
		!e.target.closest(".header__catalogbar-toggler")
	) {
		isCatalogMenuVisible.value = false;
	}
}
</script>

<template>
	<div class="header__catalogbar">
		<span
			class="header__catalogbar-toggler"
			@mousedown="isCatalogMenuVisible = !isCatalogMenuVisible"
		>
			Catalog <VIcon name="arrow" />
		</span>

		<div class="header__catalogbar-box">
			<Transition name="drop">
				<CatalogMenu
					v-if="isCatalogMenuVisible && categories"
					v-click-outside="hideCatalogMenu"
					:list="categories"
					:active-item-id="75"
				/>
			</Transition>
		</div>
	</div>
</template>

<style scoped lang="scss">
.header__catalogbar {
	@media (max-width: 768px) {
		display: none;
	}
}
.header__catalogbar-toggler {
	display: block;
	height: 50px;
	line-height: 50px;
	margin: 0 15px 0 45px;
	color: var(--color-pink);
	text-decoration: none;
	outline: 0;
	transition: all 0.5s linear;
	white-space: nowrap;
	cursor: pointer;
	transition: var(--color-tr);
}
.header__catalogbar-box {
	.catalog-menu {
		top: 50px;
		position: absolute;
		left: 0;
		z-index: 99;
	}
}
.drop-enter-active,
.drop-leave-active {
	transition: all 0.5s ease;
	z-index: 1;
}

.drop-enter-from,
.drop-leave-to {
	opacity: 0;
}
</style>
