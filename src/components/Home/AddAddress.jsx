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

const AddAddress = ({ navigation, route }) => {
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState(null);
	const [city, setCity] = useState(null);
	const [country, setCountry] = useState(null);
	const [state, setState] = useState(null);
	const [phone, setPhone] = useState(null);
	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	const [fillAllFields, setFillAllFields] = useState(false);

	useEffect(() => {
		AsyncStorage.getItem("token")
			.then((token) => {
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((result) => {
						setPhone(result.data.user.phone);
					})
					.catch((err) => {});
			})
			.catch((err) => {});
	}, []);

	const AddAddress = async () => {
		// This is the Full Validation for all the textInputs
		// {
		//     "address": "dele6 Main St",
		//     "city": "Anytown",
		//     "state": "Lagos",
		//     "country": "Nigeria",
		//     "postal": 12345,
		//     "phone": "+2348167291741",
		//     "type": "other",
		//     "defaults": false
		// }
		try {
			setLoading(true);
			if (
				address.length !== null &&
				city.length !== null &&
				state.length !== null &&
				country.length !== null
			) {
				const payload = {
					address,
					city,
					state,
					country,
					phone,
					type: "other",
					defaults: true,
				};
				console.log("payload");
				console.log(payload);

				const token = await AsyncStorage.getItem("token");
				console.log(token);
				const postAddress = await axios.post(
					"https://klick-api.onrender.com/address/",
					payload,
					{
						headers: { Authorization: "Bearer " + token },
					}
				);
				console.log(postAddress.data);

				setLoading(false);
				setSuccessModalVisible(true);
				navigation.navigate("hometab");
			} else {
				setFillAllFields(true);
				setLoading(false);
			}
		} catch (error) {
			// Handle network or other errors
			console.log("This is the Error that occurred");
			console.log(error);
			setFailedModalVisible(true);
			setLoading(false);
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
						Add Delivery Address
					</Text>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 14,
							color: "#6A6B6C",
						}}
					>
						Add Address.
					</Text>
					<GeneralInput
						placeholder={"dele6 Main St"}
						name="Address"
						width={335}
						value={address}
						onChangeValue={(text) => setAddress(text)}
					/>
					<GeneralInput
						placeholder={"Doe"}
						name="City/LGA"
						width={335}
						value={city}
						onChangeValue={(text) => setCity(text)}
					/>
					<GeneralInput
						placeholder={"johndoe@gmail.com"}
						name="State"
						width={335}
						value={state}
						onChangeValue={(text) => setState(text)}
						inputMode="email"
					/>
					<View style={styles.innerContainer}>
						<View style={{ width: "85%" }}>
							<Text style={styles.text}>{"Phone number"}</Text>
						</View>
						<View style={styles.inputContainer}>
							{/* <Text style={styles.prefix}>+234</Text> */}
							<TextInput
								placeholder={"e.g 9062056518 (whatsapp no.)"}
								style={styles.input}
								onChangeText={(text) => setPhone(text)}
								value={phone}
								inputMode="tel"
								editable={false}
							/>
						</View>
					</View>
					{/* <GeneralInput
						placeholder={"Phone Number"}
						name="Phone number"
						width={335}
						value={phone}
						// onChangeValue={(text) => setCountry(text)}
						// inputMode="email"
					/> */}

					<GeneralInput
						placeholder={"Nigeria"}
						name="Country"
						width={335}
						value={country}
						onChangeValue={(text) => setCountry(text)}
						// inputMode="email"
					/>
					<TouchableOpacity onPress={() => AddAddress()}>
						<GeneralButton
							backgroundColor={"#FEDD00"}
							message={loading ? "Loading ....." : "Add Address"}
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

					<View style={{ marginTop: 50 }} />
				</View>
			</ScrollView>

			{/* Login Successful Modal */}
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Added Successfully!"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Login Successful Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={"Please check the address and try again..."}
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
		marginVertical: 20,
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

export default AddAddress;
