import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
// import ImagePicker from 'react-native-image-picker';
import axios from "axios";
import { useSellerOnboardingContext } from "./SellerOnboarding";
import MyModal from "../../utils/MyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SellerBetter = ({ navigation, prevStage, nextStage }) => {
	const {
		setIndustry,
		setStoreName,
		setPhone,
		industry,
		storeName,
		phone,
	} = useSellerOnboardingContext();

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	const [fillAllFields, setFillAllFields] = useState(false);

	const [data, setData] = useState([]);
	useEffect(() => {
		AsyncStorage.getItem("token").then((token) => {
			axios
				.get("https://klick-api.onrender.com/category/getAll", {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						// Add more headers as needed
					},
				})
				.then((res) => {
					// console.log("!!!!!!!!Categories!!!!!!!");
					// console.log(res.data.data);
					setData(res.data.data);
				});
		});
		// const data = [
		// 	{ key: "1", value: "Electronics" },
		// 	{ key: "2", value: "Fashion" },
		// 	{ key: "3", value: "Home and Garden" },
		// 	{ key: "4", value: "Toys and Games" },
		// 	{ key: "5", value: "Food and beverages" },
		// 	{ key: "6", value: "Beauty and personal care" },
		// 	{ key: "7", value: "Travel" },
		// 	{ key: "8", value: "Education" },
		// 	{ key: "9", value: "Healthcare" },
		// 	{ key: "10", value: "Business" },
		// ];
	}, []);

	const handleValidation = () => {
		const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/; // Regex pattern to validate two words
		const regexPattern = /^(\w{4,}\s*)+$/;
		// Split the input value into individual words
		const words = storeName.split(" ");

		// Check if each word has at least three letters
		const allWordsValid = words.every((word) => word.length >= 3);

		// if (regex.test(storeName)) {
		// if (regexPattern.test(storeName)) {
		if (allWordsValid) {
			// Input value is valid
			//   Alert.alert('Success', 'Valid input!');
			//   setSuccessModalVisible(true)
			if (phone.length !== 0 && industry.length !== 0) {
				nextStage();
			} else {
				setFillAllFields(true);
			}
		} else {
			// Input value is invalid
			setFailedModalVisible(true);
			//   Alert.alert('Error', 'Please enter two words!');
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
							fontSize: 24,
							color: "#0B0B0E",
							marginLeft: 40,
							marginTop: 50,
						}}
					>
						Let’s Get to Know Your Business Better
					</Text>
					{/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
					<GeneralInput
						placeholder={"e.g Lilli Stores"}
						name="Name of Store"
						width={335}
						value={storeName}
						onChangeValue={(text) => setStoreName(text)}
					/>
					<GeneralInput
						placeholder={"e.g 07068820193"}
						name="Business Phone number"
						width={335}
						value={phone}
						onChangeValue={(text) => setPhone(text)}
						mode="tel"
					/>
					{/* <View style={{ marginTop: 20, width: 335 }}>
						<SelectList
							placeholder={"e.g Food"}
							setSelected={(val) => setIndustry(val)}
							// data={data?data:[]}
							data={data}
							save="value"
						/>
						<Text
							style={{
								fontSize: 13,
								marginBottom: 10,
								fontWeight: "500",
								fontSize: 16,
							}}
						>
							Industry
						</Text>

						<Picker
							selectedValue={industry}
							onValueChange={(itemValue, itemIndex) => setIndustry(itemValue)}
						>
							{data.map((item, index) => (
								<Picker.Item label={item.name} value={item.name} />
							))}
						</Picker>
					</View> */}
					<GeneralInput
						placeholder={"What industry do you wanna work with"}
						name="Industry"
						width={335}
						value={industry}
						onChangeValue={(text) => setIndustry(text)}
					/>

					{/* <GeneralInput name="Which industry will you be primarily operating in?" width={335}/> */}

					<TouchableOpacity onPress={() => handleValidation()}>
						<GeneralButton
							backgroundColor={"#FEDD00"}
							message={"Next"}
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
			{/* Fill all form Modal */}
			<MyModal
				state={fillAllFields}
				setState={setFillAllFields}
				text={"Please fill in all fields"}
				button={"Try again"}
				ButtonColor={"#FEDD00"}
			/>

			{/* Failed Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={
					"Please your store name should have at least two word with at least four letters each"
				}
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
		//   alignItems: 'center',
		justifyContent: "center",
		marginTop: 50
	},
	containerStyle: {
		// flex: 1,
	},
	spacerStyle: {
		marginBottom: 15,
	},
	safeContainerStyle: {
		flex: 1,
		margin: 20,
		justifyContent: "center",
	},
});

export default SellerBetter;
