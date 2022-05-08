<script setup>
import { ref } from "vue";
import api from "@/api";
import navbarRoutes from "./navbarRoutes.js";
import HeaderNavbarItem from "./HeaderNavbarItem.vue";
import HeaderCatalogbar from "./HeaderCatalogbar.vue";
import VClickOutside from "@/directives/VClickOutside.js";

const isMobileMenuOpen = ref(false);
const hamburgerRef = ref(null);

function hideMobileMenu(e) {
	if (isMobileMenuOpen && !hamburgerRef.value.contains(e.target)) {
		isMobileMenuOpen.value = false;
	}
}
</script>

<template>
	<div
		class="navbar-wrapper"
		:class="{ 'navbar-wrapper--active': isMobileMenuOpen }"
	>
		<nav
			class="navbar"
			v-click-outside="hideMobileMenu"
			:class="{ 'navbar--opened': isMobileMenuOpen }"
		>
			<ul class="navbar__list">
				<HeaderCatalogbar />

				<HeaderNavbarItem
					v-for="item in navbarRoutes"
					:item="item"
					:key="item.id"
				/>
			</ul>
		</nav>
	</div>

	<div
		class="hamburger"
		:class="{ 'hamburger--crossed': isMobileMenuOpen }"
		ref="hamburgerRef"
		@click="isMobileMenuOpen = !isMobileMenuOpen"
	>
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>

<style scoped lang="scss">
.navbar-wrapper--active {
	position: fixed;
	z-index: 99;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.53);
}
.navbar {
	@media only screen and (max-width: 768px) {
		width: 40%;
		min-height: 230px;
		text-align: left;
		background-color: var(--color-purple);
		position: fixed;
		left: 0;
		top: 0;
		transform: translateX(-100%);
		z-index: 99;
		transition: transform 0.3s;
	}

	@media (max-width: 480px) {
		width: 70%;
	}
}
.navbar--opened {
	transform: translateX(0);
}
.navbar__list {
	display: flex;

	@media (max-width: 768px) {
		flex-direction: column;
	}
}

.hamburger {
	display: inline-block;
	position: relative;
	z-index: 100;
	cursor: pointer;
	display: none;
	flex-grow: 0;
	flex-shrink: 0;
	flex-basis: 30px;
	height: 20px;

	span {
		display: block;
		width: 100%;
		height: 3px;
		background-color: var(--color-pink);
		transition: all 0.2s linear;
		position: absolute;

		&::first-child {
			top: 0;
		}

		&:nth-child(2) {
			top: calc(50% - 2px);
		}

		&:nth-child(3) {
			bottom: 0;
		}
	}

	@media only screen and (max-width: 768px) {
		display: block;
	}
}

.hamburger--crossed {
	span {
		&:first-child {
			top: 50%;
			transform: rotate(-45deg);
		}

		&:nth-child(2) {
			display: none;
		}

		&:nth-child(3) {
			top: 50%;
			transform: rotate(45deg);
		}
	}
}
</style>
