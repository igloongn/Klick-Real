import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	Dimensions,
	Pressable,
	ScrollView,
} from "react-native";

import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../settings";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigation();

	// const validateEmail = (email) => {
	// 	// Regular expression for email validation
	// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// 	return emailRegex.test(email);
	// };

	const login = async () => {
		try {
			setLoading(true);
			console.log({
				email,
				password,
			});
			const response = await fetch(API_URL + "/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phone: email,
					password,
				}),
			});
			// if (response && response.data && response.data.access_token){
			//Login Susscessful
			const data = await response.json();
			// Store the authentication token in AsyncStorage
			console.log(data);
			await AsyncStorage.setItem("token", data.access_token);
			await AsyncStorage.setItem("isLoggedIn", "true");
			// Do something with the response data
			navigation.navigate("hometab");
			// navigation.navigate('vendordash')

			Alert.alert("Login Success", data.message);
			// } else {
			//   // Login failed
			//   const errorData = await response.json();
			//   // handle login error
			//   console.log(errorData);
			//   Alert.alert('Login Error', errorData.message);
			// }
		} catch (error) {
			// Handle network or other errors
			console.error("!!!!!!!!!!!!!");
			console.error(error);
			Alert.alert("Error", "An error occured during login.");
			setLoading(false);
		}
		// finally {
		// }
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => navigation.navigate("hometab")}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						marginTop: 40,
						marginLeft: 20,
					}}
				>
					<MaterialIcons name="arrow-back" size={24} color="black" />
					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
							marginHorizintal: 10,
						}}
					>
						Home
					</Text>
				</TouchableOpacity>

				<View style={{ marginTop: "40%" }}>
					<Text>{error}</Text>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
							marginLeft: 135,
							marginTop: -50,
						}}
					>
						Login to Klick{" "}
					</Text>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 14,
							color: "#6A6B6C",
							marginLeft: 60,
						}}
					>
						Log into your account so you can sell or purchase on Klick.
					</Text>
					<GeneralInput
						placeholder={"johndoe@gmail.com"}
						name="Email"
						width={335}
						value={email}
						onChangeValue={(text) => setEmail(text)}
					/>
					<GeneralInput
						name="Password"
						width={335}
						value={password}
						onChangeValue={(text) => setPassword(text)}
						password={true}
					/>
					<TouchableOpacity onPress={() => login()}>
						<GeneralButton
							backgroundColor={"#FEDD00"}
							message={loading ? "Loading ....." : "Continue"}
							width={335}
							height={54}
							borderColor={"#FEDD00"}
							marginLeft={130}
							top={15}
							marginHorizintal={40}
							marginTop={30}
						/>
					</TouchableOpacity>
					{loading && <ActivityIndicator size="large" />}

					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							color: "#0B0B0E",
							marginLeft: 60,
							marginTop: 15,
						}}
					>
						Don't have an account yet?
					</Text>
					<Pressable onPress={() => navigation.navigate("register")}>
						<Text
							style={{
								fontWeight: "500",
								fontSize: 20,
								color: "blue",
								marginLeft: 260,
								marginTop: -22,
							}}
						>
							Sign Up
						</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		// justifyContent: "cen",
		backgroundColor: "#FFF",
		height: windowHeight,
	},
});

export default Login;
