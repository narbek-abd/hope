import {useUserStore} from "@/stores/user.js";
import Cookies from "js-cookie";
import api from '@/api';

export default function AuthProvider() {
	const userStore = useUserStore();
	let token = Cookies.get("auth-token");

	if (token && !userStore.id) {
		api.users.getCurrentUser().then((response) => userStore.setUser(response.data));
	}
}
