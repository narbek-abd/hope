import axiosClient, { webAxiosClient } from "./axiosClient";

const Orders = {
	getOrders: (params = '') => axiosClient.get(`/orders${params}`),
	getOrdersCount: () => axiosClient.get(`/orders/count`),
	createOrder: (data) => axiosClient.post("/orders", data),
	deleteOrder: (id) => axiosClient.delete(`/orders/${id}`),
};

export default Orders;
