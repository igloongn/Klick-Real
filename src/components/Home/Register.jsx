import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	ScrollView,
	ActivityIndicator,
	Alert,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URL from "../../settings";
import { TextInput } from "react-native-paper";
import MyModal from "../../utils/MyModal";

const Register = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	const [fillAllFields, setFillAllFields] = useState(false);

	const [inputError, setInputError] = useState({
		phone: false,
		password: false,
		confirmPassword: false,
	});

	const validatePhone = () => {
		if (phone.length !== 10) {
			inputError.phone = true;
		} else {
			inputError.phone = false;
		}
	};
	const validateEmail = (email) => {
		// Regular expression for email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		return emailRegex.test(email);
	};
	validatePhone();

	// const navigate = useNavigation()

	const registerUser = async () => {
		// To Check for White Spaces
		phone_number = "+234" + phone.trim();
		const payload = {
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email: email.trim(),
			phone: phone_number,
			address,
			password: password.trim(),
		};
		console.log(payload);
		// This is the Full Validation for all the textInputs
		if (
			firstName.trim() === "" ||
			lastName.trim() === "" ||
			email.trim() === "" ||
			phone.trim() === "" ||
			password.trim() === ""
		) {
			// Alert.alert("Please fill in all fields");
			setFillAllFields(true);
		} else {
			if (password.length < 8) {
				Alert.alert("Password must be at least 8 characters");
			} else {
				if (password !== confirmPassword) {
					Alert.alert("Please the password must be the same");
				} else {
					if (!validateEmail(email)) {
						Alert.alert("Please enter a valid email");
					} else {
						if (phone.length !== 10) {
							Alert.alert("Please enter a valid Phone Number");
						} else {
							try {
								setLoading(true);
								const response = await fetch(API_URL + "/auth/signup", {
									method: "POST",

									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(payload),
								});
								const res_status_code = response.status;
								const res_data = await response.json();

								if (res_status_code != 201) {
									throw new Error(res_data.message);
								}

								// Store the authentication token in AsyncStorage
								// await AsyncStorage.setItem("regToken", res_data.access_token);

								navigation.navigate("verify", {
									token: res_data.access_token,
									email,
								});
								setSuccessModalVisible(true);
							} catch (error) {
								// Handle network or other errors
								console.log("This is the Error that occurred");
								console.log(error);
								setFailedModalVisible(true);
							} finally {
								setLoading(false);
							}
						}
					}
				}
			}
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						padding: 20,
					}}
				>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
						}}
					>
						Create your Klick Account
					</Text>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 14,
							color: "#6A6B6C",
						}}
					>
						Register an account so you can start selling on Klick.
					</Text>
					<GeneralInput
						placeholder={"John"}
						name="FirstName"
						width={335}
						value={firstName}
						onChangeValue={(text) => setFirstName(text)}
					/>
					<GeneralInput
						placeholder={"Doe"}
						name="LastName"
						width={335}
						value={lastName}
						onChangeValue={(text) => setLastName(text)}
					/>
					<GeneralInput
						placeholder={"johndoe@gmail.com"}
						name="Email"
						width={335}
						value={email.trim()}
						onChangeValue={(text) => setEmail(text)}
						inputMode="email"
					/>

					<View style={styles.innerContainer}>
						<View style={{ width: "85%" }}>
							<Text style={styles.text}>{"Phone number"}</Text>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.prefix}>+234</Text>
							<TextInput
								placeholder={"e.g 9062056518 (whatsapp no.)"}
								style={styles.input}
								onChangeText={(text) => setPhone(text)}
								value={phone}
								inputMode="tel"
								error={inputError.phone}
							/>
						</View>
					</View>
					<GeneralInput
						placeholder={"17 dele6 Main St"}
						name="Add Delivery Address"
						width={335}
						value={address}
						onChangeValue={(text) => setAddress(text)}
						// inputMode="email"
					/>
					{/* Password */}
					<GeneralInput
						name="Password"
						width={335}
						value={password}
						onChangeValue={(text) => setPassword(text)}
						error={inputError.password}
						password={true}
					/>

					{/* Confirm Password */}
					<GeneralInput
						name="Confirm Password"
						width={335}
						value={confirmPassword}
						onChangeValue={(text) => setConfirmPassword(text)}
						password={true}
					/>

					<TouchableOpacity onPress={() => registerUser()}>
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
							Have an account?{" "}
						</Text>
						<Pressable onPress={() => navigation.navigate("login")}>
							<Text
								style={{
									fontWeight: "500",
									fontSize: 20,
									color: "blue",
								}}
							>
								Log in
							</Text>
						</Pressable>
					</View>

					<View style={{ marginTop: 50 }} />
				</View>
			</ScrollView>

			{/* Login Successful Modal */}
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Registration Successful"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Login Successful Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={"An error occured during Registration"}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
			{/* Fill All fields Modal */}
			<MyModal
				state={fillAllFields}
				setState={setFillAllFields}
				text={"Please fill in all fields"}
				button={"Try again"}
				ButtonColor={"#FEDD00"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#FFF",
		// alignItems: 'center',
		justifyContent: "center",
		marginVertical: 40,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		// backgroundColor: 'red',
		// borderColor: "gray",
		// borderWidth: 1,
		marginBottom: 10,
	},
	innerContainer: {
		marginTop: 25,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		// alignItems: "center",
		width: "100%",
		paddingLeft: 10,
	},
	prefix: {
		// paddingHorizontal: 10,
	},
	input: {
		// height: 32,
		padding: 2,
		backgroundColor: "#F8F8F8",
		//borderColor: '#BABABA',
		borderRadius: 10,
		// width: "90%",
		flex: 1,
		borderWidth: 1,
		borderColor: "#C4C4C4",
	},
	text: {
		fontSize: 13,
		marginBottom: 10,
		fontWeight: "500",
		fontSize: 16,
	},
});

export default Register;
