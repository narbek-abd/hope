<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import api from "@/api";
import VPagination from "@/components/VPagination.vue";
import VSpinner from "@/components/VSpinner.vue";
import VAlert from "@/components/VAlert.vue";
import UserOrdersItem from "./UserOrdersItem.vue"

const isLoading = ref(true);
const alertMessage = ref("");

const orders = ref([]);

const route = useRoute();
const currentPage = computed(() => +(route.query.page ?? 1));

const perPage = 6;
const totalItems = ref(0);

watchEffect(getOrders);

async function getOrders() {
	let response = await api.orders.getOrders(
		`?limit=${perPage}&page=${currentPage.value}`
	);

	isLoading.value = false;

	if (response.data.data.length === 0) {
		alertMessage.value = "List is empty";
	}
	orders.value = response.data.data;
	totalItems.value = response.data.total;
}
</script>

<template>
	<section class="s-orders">
		<div class="container">
			<div v-if="orders.length > 0" class="orders">
				<table class="orders__table">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Products</th>
						</tr>
					</thead>
					<tbody>
						<UserOrdersItem
						v-for="order in orders"
							key="order.id"
							:order="order"
							@delete="getOrders"
						/>
					</tbody>
				</table>
			</div>

			<VPagination
				v-if="totalItems !== 0"
				:totalItems="totalItems"
				:perPage="perPage"
			/>
			<VSpinner v-if="isLoading" />
			<VAlert v-if="alertMessage" variant="warning">{{
				alertMessage
			}}</VAlert>
		</div>
	</section>
</template>

<style scoped lang="scss">
.s-orders {
	margin-top: 60px;
}
.orders {
	margin-bottom: 40px;

	@media only screen and (max-width: 576px) {
		overflow-x: scroll;
	}
}
.orders__table {
	margin: 0 auto 30px auto;
}
</style>
