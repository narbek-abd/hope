import axiosClient from "./axiosClient";
import { slugTransliterate } from "../utils/slugTransliterate";

const Categories = {
	getCategories: (params = '') => axiosClient.get(`/categories/list${params}`),
	getCategoriesCount: () => axiosClient.get(`/categories/count`),
	getCategoriesWithChildren: () => axiosClient.get("/categories"),
	getCategory: (id) => axiosClient.get(`/categories/${id}`),
	getCategoryBySlug: (slug) =>axiosClient.get(`/categories/list?slug=${slug}`),

	createCategory: (data) => {
		data.slug = slugTransliterate(data.name);
		return axiosClient.post("/categories", data);
	},

	updateCategory: (id, data) => {
		data.slug = slugTransliterate(data.name);
		return axiosClient.put(`/categories/${id}`, data);
	},

	deleteCategory: (id) => axiosClient.delete(`/categories/${id}`),
};

export default Categories;
