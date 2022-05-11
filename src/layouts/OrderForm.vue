<script setup>
import { ref, watch, toRaw, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import api from "@/api";
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import VButton from "@/components/VButton.vue";
import { useUserStore } from "@/stores/user";
import { useCartStore } from "@/stores/cart";

const router = useRouter();
const isLoading = ref(false);
let user = useUserStore();
let cart = useCartStore();

const schema = object({
	name: string().required(),
	email: string().email().required(),
	address: string().required(),
});

const { errors, handleSubmit, isSubmitting, setValues, setErrors } = useForm({
	validationSchema: schema,
});

// we cant use watchEffect here for some reason :(
watch(user, getInitialValues);
onMounted(getInitialValues);

function getInitialValues() {
	if (user.id) {
		setValues({
			name: user.name,
			email: user.email,
		});
	}
}

const { value: name } = useField("name");
const { value: email } = useField("email");
const { value: address } = useField("address");

const onSubmit = handleSubmit(async (data) => {
	isLoading.value = true;
	if (cart.products.length < 1) {
		router.push({ name: "home" });
	}

	data.products = toRaw(cart.products);

	try {
		await api.orders.createOrder(data);
		cart.clearCart();

		user.id
			? router.push({ name: "orders", replace: true })
			: router.push({ name: "home", replace: true });
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
	<div class="order-section">
		<div class="container">
			<h3 class="order__header">Order</h3>
			<p class="order__details">Please type details bellow.</p>

			<form class="order-form" @submit.prevent="onSubmit">
				<span v-if="errors.invalid" class="form-error">
					{{ errors.invalid }}
				</span>

				<div class="order-form__group">
					<input
						v-model="name"
						type="text"
						class="input"
						placeholder="Name"
					/>
					<span class="form-error">{{ errors.name }}</span>
				</div>

				<div class="order-form__group">
					<input
						v-model="email"
						type="text"
						class="input"
						placeholder="Email"
					/>
					<span class="form-error">{{ errors.email }}</span>
				</div>

				<div class="order-form__group">
					<input
						v-model="address"
						type="text"
						class="input"
						placeholder="Address"
					/>
					<span class="form-error">{{ errors.address }}</span>
				</div>

				<div class="order-form__group">
					<VButton color="pink" :isLoading="isSubmitting"
						>Submit</VButton
					>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped lang="scss">
.order-section {
	margin-top: 60px;
	color: var(--color-dark-blue);
}
.order-form {
	margin-top: 20px;
	.input {
		padding: 7px 7px 14px 7px;
		border: none;
		border-bottom: 2px solid #bfc6e0;
		width: 100%;
	}

	.btn {
		margin-top: 40px;
	}
}
</style>
