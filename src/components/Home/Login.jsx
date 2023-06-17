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
import MyModal from "../../utils/MyModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);

	const navigate = useNavigation();

	// const validateEmail = (email) => {
	// 	// Regular expression for email validation
	// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// 	return emailRegex.test(email)_;
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
					email: email.trim(),
					password,
				}),
			});
			// if (response && response.data && response.data.access_token){
			//Login Susscessful
			const data = await response.json();
			// Store the authentication token in AsyncStorage
			console.log("!!!!!!!!!!!!!Login Response!!!!!!!!!!!!");
			console.log(data);
			await AsyncStorage.setItem("token", data.access_token);
			await AsyncStorage.setItem("isLoggedIn", "true");
			// Do something with the response data
			// navigation.navigate('vendordash')
			setSuccessModalVisible(true);
			setTimeout(() => {
				navigation.navigate("hometab");
			}, 2000);
		} catch (error) {
			// Handle network or other errors
			console.error("!!!!!!!!!!!!!");
			console.error(error);
			setFailedModalVisible(true);
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
							textAlign: "left",
						}}
					>
						Home
					</Text>
				</TouchableOpacity>

				<View
					style={{
						marginTop: "40%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text>{error}</Text>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
							marginTop: -50,
						}}
					>
						Login to Klick
					</Text>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 14,
							color: "#6A6B6C",
							paddingHorizontal: 12,
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

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							// backgroundColor: 'red'
							justifyContent: "center",
							alignContent: "center",
							marginTop: 20,
						}}
					>
						<Text
							style={{
								fontWeight: "500",
								fontSize: 20,
								color: "#0B0B0E",
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
									marginLeft: 10,
								}}
							>
								Sign Up
							</Text>
						</Pressable>
					</View>
				</View>
			</View>

			{/* Login Successful Modal */}
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Login Successful"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Login Failed Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={"An error occured during login"}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		// justifyContent: "",
		backgroundColor: "#FFF",
		height: windowHeight,
	},
});

export default Login;
