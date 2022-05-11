<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import VIcon from "@/components/VIcon.vue"

const activeTabId = ref(0);
const route = useRoute();

// const currentPath = computed(() => route.path);

const tabs = [
	{ id: 1, name: "home", link: "/", icon: "home" },
	{
		id: 2,
		name: "catalog",
		link: "/catalog",
		icon: "shopping",
	},
	{
		id: 3,
		name: "cart",
		link: "/cart",
		icon: "basket",
	},
	{
		id: 4,
		name: "wishlist",
		link: "/user/wishlist",
		icon: "heart",
	},
];

watchEffect(() => {
	if (!route.name) return;

	for (let tab of tabs) {
		const match = route.name === tab.name;

		if (!match) continue;

		activeTabId.value = tab.id;
		break;
	}
});
</script>

<template>
	<div class="bottom-nav">
		<div class="bottom-nav__list">
			<RouterLink v-for="tab in tabs" :to="tab.link" key="tab.id">
				<div
					class="bottom-nav__item"
					:class="{
						'bottom-nav__item--active': activeTabId === tab.id
					}"
				>
					<VIcon :name="tab.icon" width="88" />
				</div>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.bottom-nav {
	width: 100%;
	height: 50px;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 100;
	background-color: #fff;
	bottom: 0;
	border-top: 1px solid rgb(230, 230, 230);
	display: flex;

	@media only screen and (min-width: 992px) {
		display: none;
	}
}
.bottom-nav__list {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	a {
		width: 25%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.bottom-nav__item {
	text-align: center;

	cursor: pointer;

	svg {
		width: 28px;
		height: 28px;
		color: #ccc;
	}
}

.bottom-nav__item--active {
	svg {
		color: #7e33e0;
	}
}
</style>
