<script setup>
import { useRouter, RouterLink } from "vue-router";
import api from "@/api";
import Cookies from "js-cookie";
import { object, string } from "yup";
import { useField, useForm } from "vee-validate";
import VButton from "@/components/VButton.vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const schema = object({
	name: string().required(),
	email: string().email().required(),
	password: string().min(3).required(),
	password_confirmation: string().min(3).required(),
});

const { errors, handleSubmit, isSubmitting, setErrors } = useForm({
	validationSchema: schema,
});

const { value: name } = useField("name");
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: password_confirmation } = useField("password_confirmation");

const onSubmit = handleSubmit(async (data) => {
	try {
		let response = await api.users.registerUser(data);
		userStore.setUser(response.data.user);
		Cookies.set("auth-token", response.data.token, {
			expires: 7,
			sameSite: "Lax",
		});
		router.push({ name: "home", replace: true });
	} catch (e) {
		if (e.response.status === 422) {
			setErrors(e.response.data.errors);
		}
	}
});
</script>

<template>
	<div class="register-section">
		<h3 class="register-section__header">Register</h3>
		<p class="register-section__details">Please type details bellow.</p>

		<form class="register-form" @submit.prevent="onSubmit">
			<span v-if="errors.invalid" class="form-error">
				{{ errors.invalid }}
			</span>

			<div class="register-form__group">
				<label for="name">Name</label>
				<input v-model="name" type="text" class="input" id="name" />
				<span class="form-error">{{ errors.name }}</span>
			</div>

			<div class="register-form__group">
				<label for="email">Email</label>
				<input v-model="email" type="text" class="input" id="email" />
				<span class="form-error">{{ errors.email }}</span>
			</div>

			<div class="register-form__group">
				<label for="password">Password</label>
				<input
					v-model="password"
					type="text"
					class="input"
					id="password"
				/>
				<span class="form-error">{{ errors.password }}</span>
			</div>

			<div class="register-form__group">
				<label for="password_confirmation">Conform password</label>
				<input
					v-model="password_confirmation"
					type="text"
					class="input"
					id="password_confirmation"
				/>
				<span class="form-error">{{
					errors.password_confirmation
				}}</span>
			</div>

			<div class="register-form__group">
				<VButton color="pink" :isLoading="isSubmitting">Submit</VButton>
			</div>

			<div class="register-form__group">
				<RouterLink to="/login">
					Already have an Account? Log in
				</RouterLink>
			</div>
		</form>
	</div>
</template>

<style scoped lang="scss">
.register-section {
	color: #9096b2;
	text-align: center;
	margin: 60px auto 0 auto;

	.form-error {
		text-align: left;
	}
}
.register-form__group {
	margin-top: 23px;
	text-align: left;

	.btn {
		width: 100%;
	}
}
.register-section__header {
	font-family: "Josefin Sans";
	font-weight: 700;
	font-size: 32px;
	line-height: 32px;
	color: #000000;
}
.register-section__details {
	margin-top: 7px;
	font-family: "Josefin Sans";
	font-size: 17px;
	line-height: 20px;
}
.register-form {
	margin: 0 auto;
	width: 432px;
	margin-top: 37px;
}
</style>
