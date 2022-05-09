<script setup>
import VIcon from "@/components/VIcon.vue";
import VDropdown from "@/components/VDropdown.vue";
import { useUserStore } from "@/stores/user.js";
import { useCartStore } from "@/stores/cart.js";

const userStore = useUserStore();
const cartStore = useCartStore();
</script>

<template>
	<div class="header__top">
		<div class="container">
			<div class="header__top-inner">
				<div class="header__top-left">
					<a
						class="header__top-link"
						href="mailto:mhhasanul@gmail.com"
					>
						<VIcon name="mail" />
						comfortl@gmail.com
					</a>
					<a class="header__top-link" href="tel:1234567890">
						<VIcon name="phone" />
						(12345)67890
					</a>
				</div>
				<div class="header__top-right">
					<div class="header__top-toggle">
						<routerLink to="#" class="header__top-link">
							Wishlist <VIcon name="heart" />
							<div class="header__top-count">
								<!-- {wishlist.products.length} -->2
							</div>
						</routerLink>
					</div>

					<div class="header__top-toggle">
						<routerLink to="/cart" class="header__top-link">
							<VIcon name="basket" />
							<div class="header__top-count">
								{{ cartStore.getTotalQuantity }}
							</div>
						</routerLink>
					</div>

					<div class="header__top-toggle">
						<routerLink
							v-if="!userStore.id"
							to="/login"
							class="header__top-link"
						>
							Login <VIcon name="user" />
						</routerLink>

						<VDropdown v-else position="right">
							<template #title> Alan </template>
							<template #default>
								<li>
									<routerLink
										to="/user/orders"
										class="header__top-link"
										>My orders</routerLink
									>
								</li>
								<li @click="userStore.deleteUser()">Logout</li>
							</template>
						</VDropdown>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.header__top {
	background-color: var(--color-purple);

	@media only screen and (max-width: 576px) {
		display: none;
	}
}

.header__top-link {
	display: block;
	line-height: 44px;
	font-family: Lato;
	font-weight: bold;
	margin-right: 12px;
	color: #f1f1f1;
}
.header__top-inner {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 44px;
}
.header__top-left {
	display: flex;
	height: 100%;
	line-height: 44px;

	&:not(:first-child) {
		margin-left: 48px;
	}
}
.header__top-right {
	display: flex;
	height: 100%;
	line-height: 44px;
	justify-content: space-between;

	ul {
		background-color: #7e33e0;
		z-index: 2;
	}

	:deep(.dropdown) {
		.dropdown__toggle {
			color: #fff;
		}
		ul {
			background-color: var(--color-purple);
			width: 100px;
			li {
				color: #fff;
				cursor: pointer;
			}
		}
	}

	@media only screen and (max-width: 992px) {
		display: none;
	}
}
.header__top-toggle {
	display: flex;
	align-items: center;
	a {
		position: relative;
	}
	svg {
		margin-left: 5px;
	}

	.dropdown {
		svg {
			width: 24px;
			height: 24px;
			margin-left: 0px;
		}
	}
	li {
		padding: 5px 7px;
		height: auto;
	}
	span {
		height: 100%;
		display: block;
		cursor: pointer;
	}
	.icon-basket {
		width: 24px;
		height: 24px;
	}
}
.header__top-count {
	position: absolute;
	top: 0;
	right: -7px;
	padding-right: 0;
	font-size: 12px;
	background-color: var(--color-dark-blue);
	border-radius: 100px;
	height: 16px;
	width: 16px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	span {
		font-size: 12px;
	}
}
</style>
