<script setup>
import { ref, computed } from "vue";
import api from "@/api";
import { useUserStore } from "@/stores/user";
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import VButton from "@/components/VButton.vue";
import VAlert from "@/components/VAlert.vue";

const props = defineProps({
	productId: {
		type: Number,
		required: true,
	},
	editingText: {
		type: String,
		default: "",
	},
	commentId: {
		type: Number,
		default: null,
	},
	parentId: {
		type: Number,
		default: 0,
	},
	size: {
		validator(value) {
			return ["large", "small"].includes(value);
		},
		default: "large",
	},
	isVisible: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["submit"]);

const isLoading = ref(false);
const alertMessage = ref("");
const alertvariant = ref("success");

const userStore = useUserStore();

const CommentsFormValidation = object({
	text: string().required(),
});

const CommentsFormGuestValidation = object({
	name: string().required(),
	email: string().email().required(),
	text: string().required(),
});

const schema = computed(() => {
return userStore.id
	? CommentsFormValidation
	: CommentsFormGuestValidation;
}) 

const initialValues = {
	product_id: props.productId,
	parent_id: props.parentId,
	text: props.editingText,
};

const { errors, handleSubmit, isSubmitting, resetForm, setErrors } = useForm({
	validationSchema: schema,
	initialValues: initialValues,
});

const { value: name } = useField("name");
const { value: email } = useField("email");
const { value: text } = useField("text");
const { value: product_id } = useField("product_id");
const { value: parent_id } = useField("parent_id");

const onSubmit = handleSubmit(async (data) => {
	isLoading.value = true;

	try {
		props.editingText
			? api.comments.updateComment(props.commentId, data)
			: api.comments.createComment(data);

		emit("submit");
		resetForm();
		alertMessage.value = "Commentary was created successfully";
	} catch (e) {
		if (e.response.status === 422) {
			setErrors(e.response.data.errors);
		}
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<template v-if="isVisible">
		<VAlert v-if="alertMessage" :variant="alertvariant">{{
			alertMessage
		}}</VAlert>

		<form
			class="comments__form"
			:class="`comments__form--${size}`"
			@submit.prevent="onSubmit"
		>
			<input type="hidden" v-model="product_id" />
			<input type="hidden" v-model="parent_id" />

			<div v-if="!userStore.id" class="comments__form-block">
				<div class="comments__form-group">
					<input v-model="name" type="text" class="input" placeholder="Name" />
					<span class="form-error">{{ errors.name }}</span>
				</div>

				<div class="comments__form-group">
					<input v-model="email" type="text" class="input" placeholder="Eame"/>
					<span class="form-error">{{ errors.email }}</span>
				</div>
			</div>

			<div class="comments__form-group">
				<textarea v-model="text" placeholder="Message"></textarea>
				<span class="form-error">{{ errors.text }}</span>
			</div>

			<div class="comments__form-group">
				<VButton color="pink" :size="size" :isLoading="isLoading"
					>Submit</VButton
				>
			</div>
		</form>
	</template>
</template>

<style scoped lang="scss">
.comments__form {
	margin-top: 20px;
}
.comments__form--small {
	margin-top: 15px;
	margin-left: 30px;
	.comments__form-group {
		margin-bottom: 15px;
		margin-right: 10px;

		input,
		textarea {
			width: 100%;
			padding: 10px 15px;
			border: 1.12382px solid #8a8fb9;
		}
		textarea {
			height: 90px;
		}
		width: 250px;
	}
}
.comments__form-block {
	display: flex;
	justify-content: flex-start;
	.comments__form-group {
		margin-right: 30px;
		width: 350px;
	}
}
.comments__form-group {
	margin-bottom: 15px;
	input,
	textarea {
		width: 100%;
		padding: 10px 15px;
		border: 1.12382px solid #8a8fb9;
	}

	textarea {
		width: 730px;
		height: 150px;
		@media only screen and (max-width: 992px) {
			width: 100%;
		}
	}
}
</style>
