<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import api from "@/api";
import avatar from "@/assets/img/avatar_default.png";
import CommentsForm from "./CommentsForm.vue";
import VButton from "@/components/VButton.vue"

const props = defineProps({
	comment: {
		type: Object,
		required: true,
	},
	productId: {
		type: Number,
		required: true,
	},
	parentCommentAuthor: {
		type: String,
		default: "",
	},
	depth: {
		type: Number,
		default: 1,
	},
});

const emit = defineEmits(["changeList"]);

const userStore = useUserStore();
const canChangeComment = computed(() => userStore.id === +props.comment.user_id)

const formVisible = ref(false);
const isEditing = ref(false);
const isLoading = ref(false);

function hideFormAndChangeList() {
	isEditing.value = false;
	formVisible.value = false;

	emit("changeList");
}

async function destroyComment() {
	isLoading.value = true;
	await api.comments.deleteComment(props.comment.id);

	emit("changeList");
	isLoading.value = false;
}
</script>

<template>
	<div
		class="comments__item"
		:class="{ [`comments__item--depth-${depth}`]: depth !== 1 }"
	>
		<div class="comments__item-block">
			<div class="comments__item-figure">
				<img
					:src="avatar"
					alt="user avatar"
					class="comments__item-img"
				/>
			</div>

			<div class="comments__item-main">
				<div class="comments__item-top">
					<h3 class="comments__item-author">{{ comment.name }}</h3>
					<p class="comments__item-date">{{ comment.created_at }}</p>
				</div>

				<div class="comments__item-body">
					<span v-if="parentCommentAuthor"
						>@ {{ parentCommentAuthor }}</span
					>
					{{ comment.text }}
				</div>

				<div class="comments__item-actions">
					<span @click="formVisible = !formVisible">Reply</span>

					<template v-if="canChangeComment">
						<VButton
							size="small"
							color="warning"
							@click="isEditing = true"
						>
							Edit
						</VButton>

						<VButton
							size="small"
							color="danger"
							:isLoading="isLoading"
							@click="destroyComment"
						>
							Delete
						</VButton>
					</template>
				</div>
			</div>
		</div>

		<CommentsForm
			size="small"
			@submit="hideFormAndChangeList"
			:parent-id="comment.id"
			:product-id="productId"
			:is-visible="formVisible"
		/>

		<CommentsForm
			v-if="isEditing"
			size="small"
			@submit="hideFormAndChangeList"
			:product-id="productId"
			:is-visible="true"
			:editing-text="comment.text"
			:comment-id="comment.id"
		/>
		<!-- :parent-id="comment.id" -->

		<div
			v-if="comment.replies && comment.replies.length > 0"
			class="comments__replies"
		>
			<CommentsItem
				v-for="reply in comment.replies"
				@changeList="emit('changeList')"
				:depth="depth + 1"
				key="reply.id"
				:comment="reply"
				:product-id="productId"
				:parent-comment-author="comment.name"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.comments__item--depth-2 {
	margin-left: 35px;
}
.comments__item-block {
	margin-bottom: 20px;
	display: flex;
	box-shadow: 0px 0px 17.0038px rgba(0, 0, 0, 0.25);
	padding: 15px 13px;
}
.comments__item-figure {
	width: 48px;
	flex-shrink: 0;
	height: 63px;
	position: relative;
}
.comments__item-img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.comments__item-main {
	margin-left: 20px;
}
.comments__item-top {
	display: flex;
}
.comments__item-author {
	font-family: "Josefin Sans";
	font-style: normal;
	font-weight: 600;
	font-size: 18.1374px;
	line-height: 18px;
	letter-spacing: 0.01em;
	color: #363385;
}
.comments__item-date {
	margin-left: 30px;
	font-size: 12.4695px;
	line-height: 15px;
	color: #a3a2b6;
	@media only screen and (max-width: 480px) {
		display: none;
	}
}
.comments__item-body {
	font-size: 12.4695px;
	line-height: 28px;

	span {
		color: var(--color-purple);
	}
}
.comments__item-actions {
	cursor: pointer;
	display: flex;
	align-items: center;

	span {
		text-decoration: underline;
		text-decoration-style: dotted;
	}

	.btn {
		margin-left: 15px;
	}
}
.comments__replies {
	margin-bottom: 20px;
}
</style>
