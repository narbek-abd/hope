import axiosClient from "./axiosClient";

const Users = {
	getCurrentUser: () => axiosClient.get("/user/me"),
	registerUser: (data) => axiosClient.post("/register", data),
	loginUser: (data) => axiosClient.post("/login", data),
	logoutUser: () => axiosClient.post("logout"),
};

export default Users;
