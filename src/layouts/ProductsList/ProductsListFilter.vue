<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import getSearchParams from "@/utils/getSearchParams.js";
import VButton from "@/components/VButton.vue";

const props = defineProps({
	categoryChildrens: {
		type: Object,
		required: true,
	},
});

const route = useRoute();
const router = useRouter();

const currentPath = computed(() => route.path.replace(/\/$/, ""));

const queryCategoryList = computed(() => route.query?.categories?.split('-') || []);

const filterForm = ref({
	price_from: "",
	price_to: "",
	categories: queryCategoryList.value,
});

const onSubmit = () => {
	let filterParams = getSearchParams();

	for (let param in filterForm.value) {
		delete filterParams[param];
		if (
			filterForm.value[param] !== "" &&
			filterForm.value[param] !== false
		) {
			if (Array.isArray(filterForm.value[param])) {
				let filters;

				if (filterForm.value[param].length !== 0) {
					filters = filterForm.value[param].join("-");
					filterParams[param] = filters;
					continue;
				}
			}
			filterParams[param] = filterForm.value[param];
		}
	}

	router.push({ query: filterParams });
};
</script>

<template>
	<div class="catalog-products__filter">
		<form @submit.prevent="onSubmit" class="catalog-products__filter-form">
			<div
				v-if="categoryChildrens && categoryChildrens.length > 0"
				class="catalog-products__filter-block"
			>
				<h3 class="catalog-products__filter-title">Categories</h3>
				<div class="catalog-products__filter-content">
					<template
						v-for="category in categoryChildrens"
						key="cateogory.id"
					>
						<div
							v-if="
								category.children &&
								category.children.length > 0
							"
							class="catalog-products__parent-category"
						>
							<RouterLink :to="`${currentPath}/${category.slug}`">
								{{ category.name }}
							</RouterLink>
						</div>

						<div v-else class="checkbox">
							<input
								type="checkbox"
								class="input"
								:id="category.slug"
								v-model="filterForm.categories"
								:value="category.id"
							/>
							<label :for="category.slug">
								{{ category.name }}
							</label>
						</div>
					</template>
				</div>
			</div>

			<div class="catalog-products__filter-block">
				<h3 class="catalog-products__filter-title">Price</h3>
				<div class="catalog-products__filter-content">
					<div class="catalog-products__filter-price">
						<div>
							<span>from</span>
							<input
								type="text"
								v-model="filterForm.price_from"
							/>
						</div>
						<div>
							<span>to</span>
							<input type="text" v-model="filterForm.price_to" />
						</div>
					</div>
				</div>
			</div>

			<VButton size="small">Apply</VButton>
		</form>
	</div>
</template>

<style scoped lang="scss">
.catalog-products__filter {
	width: 256px;
	margin-right: 44px;

	@media only screen and (max-width: 992px) {
		text-align: left;
		padding: 20px;
		.catalog-products__filter-price {
			justify-content: flex-start;
		}

		.checkbox {
			text-align: left;
		}

		.btn {
			width: 100%;
			padding: 15px 0;
		}
	}
}
.catalog-products__filter-form {
}
.catalog-products__filter-block {
	margin-bottom: 30px;
}
.catalog-products__filter-title {
	font-family: "Josefin Sans";
	font-weight: 700;
	font-size: 20px;
	line-height: 30px;
	color: #292c58;
	text-decoration: underline;
}
.catalog-products__filter-content {
	margin-top: 12px;
}
.catalog-products__filter-price {
	display: flex;
	justify-content: space-between;

	span {
		color: #999;
	}
	input {
		margin-top: 6px;
		border: 1px solid #d5d5d5;
		border-radius: 8px;
		padding: 8px 16px;
		width: 100%;
	}

	div {
		&:first-child {
			input {
				border-bottom-right-radius: 0;
				border-top-right-radius: 0;
				border-right: none;
			}
		}

		&:last-child {
			input {
				border-bottom-left-radius: 0;
				border-top-left-radius: 0;
			}
		}
	}
}
.catalog-products__parent-category {
	margin-bottom: 5px;
	a {
		text-decoration: underline;
		color: var(--color-pink);
		font-size: 18px;
	}
}
</style>
