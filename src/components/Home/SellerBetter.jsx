import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { SelectList } from "react-native-dropdown-select-list";
// import ImagePicker from 'react-native-image-picker';
import axios from "axios";
import { useSellerOnboardingContext } from "./SellerOnboarding";
import MyModal from "../../utils/MyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomAlert = ({ visible, title, message, onClose }) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.ccontainer}>
				<View style={styles.alertBox}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const SellerBetter = ({ navigation, prevStage, nextStage }) => {
	const [visible, setVisible] = useState(false);
	const [token, setToken] = useState(null);
	const {
		setIndustry,
		setStoreName,
		setPhone,
		industry,
		storeName,
		phone,
	} = useSellerOnboardingContext();

	const data = [
		{ key: "1", value: "Electronics" },
		{ key: "2", value: "Fashion" },
		{ key: "3", value: "Home and Garden" },
		{ key: "4", value: "Toys and Games" },
		{ key: "5", value: "Food and beverages" },
		{ key: "6", value: "Beauty and personal care" },
		{ key: "7", value: "Travel" },
		{ key: "8", value: "Education" },
		{ key: "9", value: "Healthcare" },
		{ key: "10", value: "Business" },
	];
	useEffect(() => {
		AsyncStorage.getItem("token").then((data) => setToken(data));
	}, []);

	fetch("https://klick-api.onrender.com/auth/registerstore", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// Add any additional headers if required
			Authorization: `bearer ${token}`,
		},
		body: JSON.stringify({
			title: "New Post",
			content: "This is the content of the post.",
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data); // Handle the response data
		})
		.catch((error) => {
			console.error(error); // Handle any error that occurred
		});

	const lilVal = () => {
		const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/; // Regex pattern to validate two words

		if (regex.test(storeName)) {
			// Input value is valid
			nextStage();
		} else {
			// Input value is invalid
			// <MyModal
			// 	text={"Please the Store name must have two words"}
			// 	state={visible}
			// 	useState={setVisible}
			// 	button={"Try Again"}
			// />;
			Alert.alert("Error", "Please the Store name must have two words");

			console.log("Error", "Please the Store name must have two words");
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							color: "#0B0B0E",
							marginVertical: 30,
						}}
					>
						Let’s Get to Know Your Business Better
					</Text>
					{/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
					{/* <GeneralInput
					placeholder={"e.g Lilli Stores"}
					name="Name of Store"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/> */}
					<View style={styles.container}>
						<Text
							style={{
								fontSize: 13,
								marginBottom: 10,
								fontWeight: "500",
								fontSize: 16,
								TextAlign: "left",
							}}
						>
							{"Name of Store"}
						</Text>

						<TextInput
							style={{
								padding: 10,
								backgroundColor: "#F8F8F8",
								borderRadius: 10,
								width: 335,
								borderWidth: 1,
								borderColor: "#C4C4C4",
							}}
							value={storeName}
							onChangeText={(text) => setStoreName(text)}
							placeholder={"e.g Lilli Stores"}
						/>
					</View>
					<GeneralInput
						placeholder={"e.g 07068820193"}
						name="Business Phone number"
						width={335}
						value={phone}
						onChangeValue={(text) => setPhone(text)}
						mode={"tel"}
					/>
					<View style={{ marginTop: 30, width: 335 }}>
						<SelectList
							placeholder={"e.g Food"}
							setSelected={(val) => setIndustry(val)}
							data={data}
							save="value"
						/>
					</View>

					{/* <GeneralInput name="Which industry will you be primarily operating in?" width={335}/> */}

					<TouchableOpacity
						style={{
							marginTop: 30,
						}}
						onPress={() => lilVal()}
					>
						<GeneralButton
							backgroundColor={"#FEDD00"}
							message={"Continue"}
							width={335}
							height={54}
							borderColor={"#FEDD00"}
							marginLeft={130}
							top={15}
							marginHorizintal={40}
							marginTop={30}
						/>
					</TouchableOpacity>

					<View style={{ marginTop: 50 }} />
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#FFF",
		//   alignItems: 'center',
		justifyContent: "center",
	},
	containerStyle: {
		flex: 1,
	},
	spacerStyle: {
		marginBottom: 15,
	},
	safeContainerStyle: {
		flex: 1,
		margin: 20,
		justifyContent: "center",
	},
	ccontainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	alertBox: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		width: "80%",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	message: {
		fontSize: 16,
		marginBottom: 16,
	},
	button: {
		backgroundColor: "#f0f0f0",
		padding: 8,
		borderRadius: 4,
		alignItems: "center",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
});

export default SellerBetter;
