<script setup>
import { ref, watch, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import getSearchParams from "@/utils/getSearchParams.js";

let props = defineProps({
	totalItems: {
		type: Number,
		required: true,
	},
	perPage: {
		type: Number,
		required: true,
	},
	rangeCount: {
		type: Number,
		default: 7,
	},
});

const route = useRoute();
const router = useRouter();

const currentPage = computed(() => +(route.query.page ?? 1));
const pageRangeOffset = 3;
const pageOffsetIndex = ref(0);

const lastPage = computed(() => Math.ceil(props.totalItems / props.perPage));
const pageRangeCount = computed(() => {
	return lastPage.value > props.rangeCount
		? props.rangeCount
		: lastPage.value;
});
const pages = computed(() => Array.from(Array(pageRangeCount.value).keys()));

watchEffect(() => {
	pageOffsetIndex.value = 0;

	if (currentPage.value + pageRangeOffset > pageRangeCount.value) {
		pageOffsetIndex.value =
			currentPage.value + pageRangeOffset - pageRangeCount.value;
	}
	if (currentPage.value + pageRangeOffset >= lastPage.value) {
		pageOffsetIndex.value = lastPage.value - pageRangeCount.value;
	}
});

function onPageChange(pageId) {
	let params = getSearchParams();

	params["page"] = pageId;
	router.push({ query: params });
}
</script>

<template>
	<ul class="pagination">
		<li v-if="currentPage - 1 !== 0" class="pagination__item">
			<button
				@click="onPageChange(currentPage - 1)"
				class="pagination__btn"
			>
				prev
			</button>
		</li>

		<li v-if="pageOffsetIndex > 0" class="pagination__item">
			<button @click="onPageChange(1)" class="pagination__btn">1</button>
			<span>...</span>
		</li>

		<li
			v-for="page in pages"
			key="page + 1"
			class="pagination__item"
			:class="{
				'pagination__item--active':
					page + 1 === currentPage - pageOffsetIndex,
			}"
		>
			<button
				@click="onPageChange(page + 1 + pageOffsetIndex)"
				class="pagination__btn"
			>
				{{ page + 1 + pageOffsetIndex }}
			</button>
		</li>

		<li
			v-if="pageOffsetIndex + pageRangeCount < lastPage"
			class="pagination__item"
		>
			<span>...</span>
			<button @click="onPageChange(lastPage)" class="pagination__btn">
				{{ lastPage }}
			</button>
		</li>

		<li v-if="currentPage * perPage < totalItems" class="pagination__item">
			<button
				@click="onPageChange(currentPage + 1)"
				class="pagination__btn"
			>
				next
			</button>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.pagination {
	display: flex;
	justify-content: center;
}
.pagination__item {
	display: flex;
	span {
		margin-bottom: 5px;
	}
}
.pagination__btn {
	cursor: pointer;
	border-radius: 3px;
	margin: 0 3px;
	color: #fff;
	background-color: #d06593a1;
	padding: 0.375rem 0.75rem;
}

.pagination__item--active {
	.pagination__btn {
		background-color: var(--color-pink);
	}
}
</style>
