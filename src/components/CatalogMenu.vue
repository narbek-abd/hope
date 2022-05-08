<script setup>
import { ref, computed, watchEffect } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
	list: {
		type: Object,
		required: true,
	},
	activeItemId: {
		type: Number,
		default: 1,
	},
});
const focusedItemId = ref(null);

watchEffect(() => {
	changeFocusedItem(props.activeItemId);
});

function changeFocusedItem(id) {
	focusedItemId.value = id;
}

const focusedCategoryList = computed(() => {
	let activeCategory = props.list.filter(
		(item) => item.id === +focusedItemId.value
	)[0];

	if (activeCategory !== undefined) {
		return activeCategory["children"];
	}
});
</script>

<template>
	<div class="catalog-menu">
		<ul class="catalog-menu__list">
			<li
				v-for="item in list"
				key="item.id"
				@mouseenter="changeFocusedItem(item.id)"
				class="catalog-menu__item"
				:class="{
					'catalog-menu__item--focused': item.id === +focusedItemId,
				}"
			>
				{{ item.name }}
			</li>
		</ul>

		<div class="catalog-menu__focused-list">
			<div v-for="category in focusedCategoryList" key="category.id">
				<RouterLink
					:to="`/catalog/${category.slug}`"
					class="catalog-menu__focused-link"
				>
					{{ category.name }}
				</RouterLink>

				<ul>
					<li v-for="child in category['children']" key="child.id">
						<RouterLink
							:to="`/catalog/${category.slug}/${child.slug}`"
							class="catalog-menu__focused-sublink"
							>{{ child.name }}</RouterLink
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.catalog-menu {
	display: flex;
	width: 100%;
	background-color: #fff;
	min-height: 250px;
	border-radius: 30px;
}
.catalog-menu__list {
	width: 308px;
	flex-shrink: 0;
	padding: 20px 0 20px 30px;
	padding-right: 0px;
	overflow: auto;
}
.catalog-menu__item {
	padding: 10px 7px;
	cursor: pointer;
	border-radius: 3px;
}
.catalog-menu__item--focused {
	color: #fff;
	background-color: var(--color-purple);
}
.catalog-menu__focused-list {
	padding: 20px 0 20px 30px;
}

.catalog-menu__focused-link {
	font-weight: bold;
	padding: 10px 7px;
	display: block;
	color: #000;
}

.catalog-menu__focused-sublink {
	font-weight: normal;
	color: #333;
	display: block;
	padding: 9px;
}
</style>
