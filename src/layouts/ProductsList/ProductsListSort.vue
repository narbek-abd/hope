<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import getSearchParams from "@/utils/getSearchParams.js";
import VDropdown from "@/components/VDropdown.vue";

const router = useRouter();
const currentSortBy = ref("New");
const sortByOptions = [
	{
		id: 1,
		slug: "new",
		name: "New",
	},

	{
		id: 2,
		slug: "price_low_to_high",
		name: "Price: Low to High",
	},

	{
		id: 3,
		slug: "price_high_to_low",
		name: "Price: High to Low",
	},
];

function sortProductsBy(id) {
	let selectedOption = sortByOptions.find((option) => option.id === id);

	if (selectedOption) {
		currentSortBy.value = selectedOption.name;

		let params = getSearchParams();
		params["sort_by"] = selectedOption.slug;
		router.push({ query: params });
	}
}
</script>

<template>
	<div class="catalog-products__sort">
		<div class="catalog-products__sort-left">
			<p>Ecommerce Acceories & Fashion item</p>
			<span>About 9,620 results (0.62 seconds)</span>
		</div>

		<div class="catalog-products__sort-right">
			<p>Sort By:</p>

			<VDropdown>
				<template #title>{{ currentSortBy }}</template>
				<li
					v-for="sortOption in sortByOptions"
					key="sortOption.id"
					@click="sortProductsBy(sortOption.id)"
				>
					<template v-if="sortOption.name !== currentSortBy">
						{{ sortOption.name }}
					</template>
				</li>
			</VDropdown>
		</div>
	</div>
</template>

<style scoped lang="scss">
.catalog-products__sort {
	display: flex;
	justify-content: space-between;
}
.catalog-products__sort-left {
	p {
		font-family: "Josefin Sans";
		font-weight: 700;
		font-size: 22px;
		line-height: 22px;
		color: #151875;
	}
	span {
		font-weight: 400;
		font-size: 12px;
		line-height: 14px;
		color: #8a8fb9;
		margin-top: 8px;
	}

	@media only screen and (max-width: 768px) {
		display: none;
	}
}
.catalog-products__sort-right {
	&:deep .dropdown__list {
		margin-top: 10px;
		width: 170px;
		background-color: var(--color-dark-blue);
		color: #fff;
		border-radius: 3px;
		li {
			cursor: pointer;
			padding: 7px;
		}
	}

	&:deep .dropdown__toggle {
		text-decoration: underline;
	}
}
</style>
