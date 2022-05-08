<script setup>
import { ref, watchEffect, nextTick, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const props = defineProps({
	customRoutes: {
		type: Array,
		default: [],
	},
});

const route = useRoute();

const initialRoutes = [{ name: "Home", url: "/" }];
const breadCrumbs = ref(initialRoutes.concat(props.customRoutes));

/** if the routes are not passed, generate by location*/
watchEffect(() => {
	if (props.customRoutes.length > 0) return;

	let locationRoutes = [];
	const currentRoutes = route.path.split("/");

	currentRoutes.forEach((route) => {
		if (!route) return;

		let name = route[0].toUpperCase() + route.slice(1);
		name = name.replace(/_/g, " ");

		locationRoutes.push({ name: name, url: route });
	});

	breadCrumbs.value = breadCrumbs.value.concat(locationRoutes);
});

const breadCrumbList = computed(() => {
	let list = [];
	let currentUrl = "";

	breadCrumbs.value.forEach((breadCrumb, index) => {
		let isLastRoute = index === breadCrumbs.value.length - 1;

		if (breadCrumb.url !== "/") {
			currentUrl = currentUrl + "/" + breadCrumb.url;
		}

		breadCrumb.currentUrl = currentUrl;
		breadCrumb.isLastRoute = isLastRoute;
		list.push(breadCrumb);
	});

	return list;
});
</script>

<template>
	<div class="breadcrumbs">
		<ul>
			<li v-for="breadCrumb in breadCrumbList" class="breadcrumbs__item">
				<span
					v-if="breadCrumb.isLastRoute"
					class="breadcrumbs__link breadcrumbs__link--active"
				>
					{{ breadCrumb.name }}
				</span>

				<RouterLink
					v-else
					:to="breadCrumb.currentUrl || '/'"
					class="breadcrumbs__link"
				>
					{{ breadCrumb.name }} /
				</RouterLink>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.breadcrumbs {
	margin: 35px 0;
}
.breadcrumbs__item {
	display: inline-block;
	margin-right: 5px;
}
.breadcrumbs__link {
	font-family: "Lato";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	color: #000;
}
.breadcrumbs__link--active {
	color: var(--color-pink);
}
</style>
