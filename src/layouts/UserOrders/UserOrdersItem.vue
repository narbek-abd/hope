<script setup>
import { ref } from "vue";
import api from "@/api";
import VButton from "@/components/VButton.vue";

const props = defineProps({
	order: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["delete"]);

const isLoading = ref(false);

async function removeOrder() {
	isLoading.value = true;
	let response = await api.orders.deleteOrder(props.order.id);

	emit("delete");
}
</script>

<template>
	<tr>
		<td>{{ order.id }}</td>
		<td>{{ order.name }}</td>
		<td>{{ order.email }}</td>
		<td>{{ order.address }}</td>
		<td>
			<RouterLink
				v-for="product in order.products"
				key="product.id"
				:to="`/product/${product.id}`"
			>
				{{ product.name }}
			</RouterLink>
		</td>
		<td>
			<VButton
				:isLoading="isLoading"
				size="small"
				color="danger"
				@click="removeOrder"
			>
				Cancel order
			</VButton>
		</td>
	</tr>
</template>

<style scoped lang="scss"></style>
