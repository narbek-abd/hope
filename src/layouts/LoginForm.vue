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
	email: string().email().required(),
});

const { errors, handleSubmit, isSubmitting, setErrors } = useForm({
	validationSchema: schema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");

const onSubmit = handleSubmit(async (data) => {
	try {
		let response = await api.users.loginUser(data);
		userStore.setUser(response.data.user);
		Cookies.set("auth-token", response.data.token, {
			expires: 7,
			sameSite: "Lax",
		});
		router.go(-1);
	} catch (e) {
		if (e.response.status === 422) {
			setErrors(e.response.data.errors);
		}
	}
});
</script>

<template>
	<div class="login-section">
		<h3 class="login-section__header">login</h3>
		<p class="login-section__details">Please type details bellow.</p>

		<form class="login-form" @submit.prevent="onSubmit">
			<span v-if="errors.invalid" class="form-error">
				{{ errors.invalid }}
			</span>

			<div class="login-form__group">
				<label for="email">Email</label>
				<input v-model="email" type="text" class="input" id="email" />
				<span class="form-error">{{ errors.email }}</span>
			</div>

			<div class="login-form__group">
				<label for="password">Password</label>
				<input
					v-model="password"
					type="text"
					class="input"
					id="password"
				/>
				<span class="form-error">{{ errors.password }}</span>
			</div>

			<div class="login-form__group">
				<VButton color="pink" :isLoading="isSubmitting">Submit</VButton>
			</div>

			<div class="login-form__group">
				<RouterLink to="register">
					Don’t have an Account? Create account
				</RouterLink>
			</div>
		</form>
	</div>
</template>

<style scoped lang="scss">
.login-section {
	color: #9096b2;
	text-align: center;
	margin: 60px auto 0 auto;
	.form-error {
		text-align: left;
	}
}
.login-form__group {
	margin-top: 23px;
	text-align: left;

	.btn {
		width: 100%;
	}
}
.login-section__header {
	font-family: "Josefin Sans";
	font-weight: 700;
	font-size: 32px;
	line-height: 32px;
	color: #000000;
}
.login-section__details {
	margin-top: 7px;
	font-family: "Josefin Sans";
	font-size: 17px;
	line-height: 20px;
}
.login-form {
	margin: 0 auto;
	width: 432px;
	margin-top: 37px;
}
</style>
