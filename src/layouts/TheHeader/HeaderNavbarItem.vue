<script setup>
import { computed, ref } from "vue";
import VIcon from "@/components/VIcon.vue";
import slideToggle, { slideUp } from "@/utils/SlideUpDown.js";
import VClickOutside from "@/directives/VClickOutside.js";

const props = defineProps(["item"]);

const dropdownListRef = ref(null);

function hideDropdown() {
	slideUp(dropdownListRef.value, 200);
}

function toggleDropdown() {
	slideToggle(dropdownListRef.value, 200);
}

let hasChildren = computed(() => {
	return props.item["children"] && props.item["children"].length > 0;
});
</script>

<template>
	<li class="navbar__item">
		<div
			v-if="hasChildren"
			v-click-outside="hideDropdown"
			class="navbar__item-dropdown"
		>
			<span class="navbar__link" @click="toggleDropdown">
				{{ item.name }} <VIcon name="arrow" />
			</span>

			<ul class="navbar__item-dropdown__list" ref="dropdownListRef">
				<HeaderNavbarItem
					v-for="item in item['children']"
					:item="item"
					:key="item.id"
				/>
			</ul>
		</div>

		<RouterLink v-else to="#" class="navbar__link">
			{{ item.name }}
		</RouterLink>
	</li>
</template>

<style scoped lang="scss">
.navbar__item {
	position: relative;
	display: inline-block;
	list-style: none;
	cursor: pointer;
	text-align: center;

	@media only screen and (max-width: 768px) {
		display: block;
		padding-left: 15px;
	}
}
.navbar__link {
	display: block;
	height: 50px;
	line-height: 50px;
	margin: 0 15px;
	color: #0d0e43;
	text-decoration: none;
	outline: 0;
	transition: all 0.5s linear;
	white-space: nowrap;
	transition: var(--color-tr);

	&:hover {
		color: var(--color-pink);
	}

	@media (max-width: 768px) {
		color: #fff;
		text-align: left;
		margin: 0;
	}
}

.navbar__item-dropdown__list {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	z-index: 99;
	text-align: center;
	background-color: var(--color-purple);
	list-style-type: none;
	display: none;

	@media only screen and (max-width: 768px) {
		position: static;
		transform: none;
	}

	span {
		color: #fff;
	}

	li a {
		color: #fff;
		margin-left: 0;
	}
}
.navbar__item-dropdown {
	position: relative;
}
.navbar__item-dropdown .navbar__link {
	margin: 0;
}

.navbar__item-dropdown__list .navbar__item {
	padding: 7px 17px;
}
</style>
