import axiosClient from "./axiosClient";

const Products = {
	getProducts: (params = '') => axiosClient.get(`/products/list${params}`),
	getProductsCount: () => axiosClient.get(`/products/count`),
	getProductsByIds: (ids) => axiosClient.get(`/products`, { params: { ids: ids } }),
	createProduct: (formData) => axiosClient.post("/products", formData),

	updateProduct: (id, formData) => {
		// we can't send images like formdata using the axios.PUT method, so we specify method manually and send using POST
		formData.append("_method", "PUT");
		return axiosClient.post(`/products/${id}`, formData);
	},

	getProduct: (id) => axiosClient.get(`/products/${id}`),
	getProductComments: (id, limit) => axiosClient.get(`/product/comments/${id}?limit=${limit}`),
	deleteProduct: (id) => axiosClient.delete(`/products/${id}`),
	deleteProductImage: (id) => axiosClient.delete(`/products/image/${id}`),
}

export default Products;