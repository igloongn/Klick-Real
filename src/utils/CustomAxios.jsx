import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

AsyncStorage.getItem("token").then((token) => {
	const customAxios = axios.create({
		baseURL: "https://klick-api.onrender.com",
		headers: {
			Authorization: "Bearer "+token,
			"Content-Type": "application/json",
		},
	});
});


