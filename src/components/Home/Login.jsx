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
import ModalFunc from "../../utils/ModalFunc";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ navigation, route }) => {
	const from = route.params;
	// console.log("from");
	// console.log(from);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	const [verifyVisible, setVerifyVisible] = useState(false);
	const [regToken, setRegToken] = useState(null);

	const navigate = useNavigation();

	// const validateEmail = (email) => {
	// 	// Regular expression for email validation
	// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// 	return emailRegex.test(email)_;
	// };

	const onLogin = async () => {
		const payload = {
			email: email.trim(),
			password,
		};
		// console.log(payload);
		setLoading(true);
		setFailedModalVisible(false);

		axios
			.post("https://klick-api.onrender.com/auth/signin", payload)
			.then((response) => {
				// console.log("POST request successful");
				// console.log("Response:", response.data);
				// console.log("!!!!!!!!!!!!!Login Response!!!!!!!!!!!!");
				// console.log(data.status_code);
				AsyncStorage.setItem("token", response.data.access_token);
				AsyncStorage.setItem("isLoggedIn", "true");
				// Do something with the response data
				// navigation.navigate('vendordash')
				setSuccessModalVisible(true);
				setTimeout(() => {
					switch (from.route) {
						case "button":
							console.log("from Buttom");
							navigation.navigate("hometab");
							break;

						case "productData":
							console.log("from Product Detail Page");
							navigation.navigate({
								name: "productdetails",
								params: { id: from.id },
							});
							break;

						case "cart":
							console.log("from Cart");
							navigation.navigate("mycart");
							break;

						case "modal":
							console.log("from Buttom");
							navigation.navigate("sellerstab");
							break;

						default:
							break;
					}
				}, 1500);
				setLoading(false);
			})
			.catch((error) => {
				console.log("POST request failed");

				if (error.response) {
					// console.log("Error response data:", error.response.data);
					// console.log("Error response headers:", error.response.headers);
					console.log("Error response status:", error.response.status);

					if (error.response.status === 422) {
						console.log("Error response status:", error.response.status);
						setRegToken(error.response.data.access_token);
						AsyncStorage.setItem(
							"payload",
							JSON.stringify({
								email,
								Regtoken: error.response.data.access_token,
							})
						);
						console.log(error.response.data.access_token);
						setVerifyVisible(true);
					}

					if (error.response.status === 400) {
						console.log("Error response status 400:", error.response.status);
						// console.log(object)
						setFailedModalVisible(true);
					}
				} else {
					console.error("Error:", error.message);
				}
				// setFailedModalVisible(true);
				setLoading(false);
			});
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
					<TouchableOpacity onPress={() => onLogin()}>
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
				text={"invalid Credentials"}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
			{/* Resend OTP Modal */}
			<ModalFunc
				state={verifyVisible}
				setState={setVerifyVisible}
				text={"Please Verify Your Email"}
				button={"Verify"}
				ButtonColor={"#FEDD00"}
				onPress={() => {
					navigation.navigate({
						name: "verify",
						params: {
							token: regToken,
							email,
						},
					});
				}}
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
