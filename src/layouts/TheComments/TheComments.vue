<script setup>
import { ref, watchEffect } from "vue";
import api from "@/api";
import VSpinner from "@/components/VSpinner.vue";
import CommentsItem from "./CommentsItem.vue";
import CommentsForm from "./CommentsForm.vue";
import VIntersection from "@/directives/VIntersection.js";

const props = defineProps({
	productId: {
		type: Number,
		required: true,
	},
});

const comments = ref(null);
const commentsLimit = ref(6);
const hasMore = ref(true);

watchEffect(getComemnts);

async function getComemnts() {
	if (!hasMore) return;

	let response = await api.products.getProductComments(
		props.productId,
		commentsLimit.value
	);
	hasMore.value = response.data.next_page_url !== null;
	comments.value = response.data.data;
}

function loadMore() {
	commentsLimit.value = commentsLimit.value + commentsLimit.value;
}
</script>

<template>
	<section class="comments">
		<div class="container">
			<h3>Comments</h3>
			<CommentsForm @submit="getComemnts" :product-id="productId" />

			<ul class="comments__list">
				<template v-if="comments && comments.length > 0">
					<CommentsItem
						v-for="comment in comments"
						:comment="comment"
						key="comment.id"
						@changeList="getComemnts"
						:product-id="productId"
					/>
				</template>
			</ul>
			<div v-intersection="loadMore"><VSpinner v-if="hasMore" /></div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.comments {
	margin-top: 58px;
}
.comments__list {
	width: 100%;
	margin-top: 90px;
}
</style>
